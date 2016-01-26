Accounts.onResetPasswordLink(function (token, done) {
	FlowRouter.go('/forgot');
	Session.set('resetToken', token);
});

Template.forgot.helpers({
	resetting: function() {
		return Session.get('resetToken');
	}
});

Template.forgot.events({
	'click .back': function(e) {
		e.preventDefault();
		if ( !!Meteor.user() ) {
			FlowRouter.go('/');
		} else {
			FlowRouter.go('/login');
		}
	},
	'submit #start-reset': function(e) {
		e.preventDefault();

		var email = e.target.email.value.trim().toLowerCase(),
			messages = [];

		if ( !email ) {
			messages.push('Please enter your account e-mail address.');
		}
		if ( email.indexOf('@') === -1 || // email address must contain @
			email.indexOf('.') === -1 // email address must contain .
		) {
			messages.push('Please enter a valid e-mail address.');
		}
		if ( messages.length ) {
			Meteor.helpers.appendMessages(e.target, messages);
		} else {
			Session.set('loading', true);
			Accounts.forgotPassword({email: email}, function(err) {
				if (err) {
					Meteor.helpers.appendMessages(e.target, [err.reason]);
				}
				else {
					Meteor.helpers.appendMessages(e.target, ['Recovery e-mail sent! Check your e-mail for instructions.']);
				}
				Session.set('loading', false);
			});
		}
		return false;
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
	'submit #reset': function(e) {
		e.preventDefault();
		var token = Session.get('resetToken'),
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
			Session.set('messages', ['Your password has been reset. Please log in with your new password.']);
			Accounts.resetPassword(token, password, function(err) {
				if ( err ) {
					console.log(err);
					Meteor.helpers.appendMessages(e.target, [err.reason]);
				} else {
					Meteor.logout(function() {
						// unset Session registration keys
						Session.set('resetToken', undefined);

						// go back to login screen
						FlowRouter.go('/login');
					});
				}
				Session.set('loading', false);
			});
		}
		return false;
	}
});