Meteor.startup(function() {
	var trash = Stories.find({ 'status.current': 'trash' }).fetch(),
		days;

	// note: this should also go in the loginWithPassword callback so that trashed stories are checked and deleted on user login
	// check for trashed stories and delete those trashed 30+ days ago
	for ( var i = 0; i !== trash.length; i++ ) {
		days = new Date(trash[i].status.date + 30 * 24 * 3600 * 1000);
		console.log(days);
	}

	// set email environment credentials
	process.env.MAIL_URL = 'smtp://no-reply%40yumhut.com:e^xQnekA@mail.yumhut.com:465';

	Accounts.emailTemplates.siteName = 'Meteorite';
	Accounts.emailTemplates.from = 'Meteorite <no-reply@yumhut.com>';
	Accounts.emailTemplates.enrollAccount.subject = function (user) {
		return 'Confirm your registration';
	};
	Accounts.emailTemplates.enrollAccount.text = function (user, url) {
		return 'Thanks for joining Meteorite, ' + user.username + '! You’re seconds away from writing. To activate your account, click the link below:\n\n' + url;
	};
	Accounts.emailTemplates.resetPassword.subject = function (user) {
		return 'Reset your Meteorite password';
	};
	Accounts.emailTemplates.resetPassword.text = function (user, url) {
		return 'Hi, ' + user.username + '! We’re sending you this e-mail because we received a request to reset your password. If you don’t want to reset your password, just ignore this e-mail. Otherwise, click the link below to reset it:\n\n' + url;
	};

});