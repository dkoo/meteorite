Template.intro.onRendered(function() {
	// temporarily, just redirect to the login screen if not logged in
	// TO DO: design a proper intro/splash page

	if ( !Meteor.user() ) {
		FlowRouter.go('/login');
	}
});