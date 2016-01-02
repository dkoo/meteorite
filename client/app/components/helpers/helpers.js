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
	},
	makeSlug: function(str) {
		var arr = str.split(' '),
			slug = [],
			newSlug,
			existing;

		for ( var i = 0, len = arr.length; i !== len; i++ ) {
			if ( arr[i] ) {
				// remove punctuation, make all words lowercase, join with hyphens
				slug.push(arr[i].replace(/[^\w\s-]|_/g, '').replace(/\s+/g, ' ').toLowerCase());
			}
		}

		newSlug = slug.join('-').replace('--', '-');

		// existing = Posts.find( { slug: newSlug } );

		// // if there's already one or more posts with this slug, increment the slug
		// if ( existing.count() ) {
		// 	newSlug += '-' + ( existing.count() + 1 );
		// }

		return newSlug;
	}
}