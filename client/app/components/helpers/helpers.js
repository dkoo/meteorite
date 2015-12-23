Template.registerHelper('loggedIn', function() {
	return Meteor.user() ? true : false;
});