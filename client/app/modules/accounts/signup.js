Accounts.onEnrollmentLink(function (token, done) {
	FlowRouter.go('/signup');
	Session.set('activateToken', token);
});

Template.signup.helpers({
	activating: function() {
		return Session.get('activateToken');
	}
});

Template.signup.events({
	'click .login': function(e) {
		e.preventDefault();
		FlowRouter.go('/login');
	},
	// validate username on the fly
	'input #user': function(e) {
		if ( e.target.value ) {
			Meteor.call('checkUsername', e.target.value, function(err, response) {
				if ( err ) {
					e.target.parentNode.classList.remove('valid');
					e.target.parentNode.classList.add('invalid');
				} else {
					e.target.parentNode.classList.remove('invalid');
					e.target.parentNode.classList.add('valid');
				}
			});
		} else {
			e.target.parentNode.classList.remove('valid');
			e.target.parentNode.classList.remove('invalid');
		}
	},
	'input #email': function(e) {
		if ( e.target.value ) {
			if ( e.target.value.indexOf('@') < 0 || e.target.value.indexOf('.') < 0 ) {
				e.target.parentNode.classList.remove('valid');
				e.target.parentNode.classList.add('invalid');
			} else {
					e.target.parentNode.classList.remove('invalid');
					e.target.parentNode.classList.add('valid');
			}
		} else {
			e.target.parentNode.classList.remove('valid');
			e.target.parentNode.classList.remove('invalid');
		}
	},
	'input #password': function(e) {
		if ( Meteor.utils.validPassword(e.target.value) ) {
			e.target.parentNode.classList.remove('invalid');
			e.target.parentNode.classList.add('valid');
		} else {
			e.target.parentNode.classList.remove('valid');
			e.target.parentNode.classList.add('invalid');
		}
	},
	'input #confirm': function(e, t) {
		var password = t.find('#password');

		if ( password.value === e.target.value ) {
			e.target.parentNode.classList.add('valid');
			e.target.parentNode.classList.remove('invalid');
		} else {
			e.target.parentNode.classList.remove('valid');
			e.target.parentNode.classList.add('invalid');
		}
	},
	'submit #signup': function(e) {
		e.preventDefault();
		var user = {
				username: e.target.user.value.trim(),
				email: e.target.email.value.trim().toLowerCase()
			},
			messages = [];

		if ( !user.username || !user.email ) {
			if ( !user.username ) {
				messages.push('Please enter your username.');
			}
			if ( !user.email ) {
				messages.push('Please enter an e-mail address.');
			} else {
				if ( e.target.value.indexOf('@') < 0 && e.target.value.indexOf('.') < 0 ) {
					messages.push('Please enter a valid e-mail address.');
				}
			}
		}

		if ( messages.length ) {
			Meteor.helpers.appendMessages(e.target, messages);
			return false;
		}

		Session.set('loading', true);
		// create the user account
		Meteor.call('createNewUser', user, function(err) {
			if ( err ) {
				console.log(err);
				messages.push(err.reason);
				Meteor.helpers.appendMessages(e.target, messages);
			} else {
				// remove action buttons on success
				var buttons = e.target.querySelectorAll('button');
				for ( var i = 0; i !== buttons.length; i++ ) {
					buttons[i].parentNode.removeChild(buttons[i]);
				}

				Meteor.helpers.appendMessages(e.target, ['Account created! Check your email to complete signup.']);
			}
			Session.set('loading', false);
		});
	},
	'submit #activate': function(e) {
		e.preventDefault();
		var token = Session.get('activateToken'),
			password = e.target.password.value,
			confirm = e.target.confirm.value,
			messages = [];

		// validate password fields
		if ( !Meteor.utils.validPassword(password) ) {
			messages.push('Passwords must be at least 6 characters and contain at least one number, one uppercase and one lowercase letter.');
		}
		if ( password !== confirm ) {
			messages.push('Password fields do not match.')
		}
		if ( messages.length ) {
			Meteor.helpers.appendMessages(e.target, messages);
		} else {
			Session.set('loading', true);
			Accounts.resetPassword(token, password, function(err) {
				if ( err ) {
					console.log(err);
					Meteor.helpers.appendMessages(e.target, [err.reason]);
				} else {
					// unset Session registration keys
					Session.set('activateToken', undefined);

					// log in with the given password
					Session.set('loading', true);
					Meteor.loginWithPassword(Meteor.user().username, password);
					FlowRouter.go('/');
				}
				Session.set('loading', false);
			});
		}
		return false;
	}
});