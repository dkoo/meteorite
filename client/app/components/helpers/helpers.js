Template.registerHelper('loggedIn', function() {
	return Meteor.user() ? true : false;
});

// random utilities
Meteor.utils = {
	// simple helper to toggle a boolean Session key
	sessionToggle: function(key) {
		if ( Session.get(key) ){
			Session.set(key, false);
		} else {
			Session.set(key, true);
		}
	}
}