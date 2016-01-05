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
	debounce: function(fn, delay, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) fn.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, delay);
			if (callNow) fn.apply(context, args);
		};
	},
	throttle: function(fn, delay) {
		var wait = false;
		return function () {
			if ( !wait ) {
				fn.call();
				wait = true;
				setTimeout(function () {
					wait = false;
				}, delay);
			}
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