Template.login.events({
	'click .signup': function(e) {
		e.preventDefault();

		FlowRouter.go('/signup');
	},
	'submit #login': function(e) {
		e.preventDefault();

		var messages = []
			user = {
				username: e.target.user.value.trim().toLowerCase(),
				password: e.target.password.value
			},
			priorMessages = e.target.querySelector('.messages');

		// clear out any existing messages
		if ( priorMessages ) {
			priorMessages.parentNode.removeChild(priorMessages);
		};

		// validate email and password
		if ( !user.username || !user.password ) { // if there's no email/password or the email doesn't contain an @ character
			if ( !user.username ) {
				messages.push('Please enter your username.');
			}
			if ( !user.password ) {
				messages.push('Please enter your password.');
			}
		}

		if ( messages.length ) {
			Meteor.helpers.appendMessages(e.target, messages);
			return false;
		}

		Meteor.loginWithPassword(user.username, user.password, function(err){
			// handle callback errors
			if (err) {
				console.log(err);
				messages.push(err.reason);
				Meteor.helpers.appendMessages(e.target, messages);
			} else {
				// successful login
				console.log('logging in');
			}
		});
		return false;
	}
});