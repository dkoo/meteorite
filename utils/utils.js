Meteor.utils = {
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
	},
	validPassword: function(str) {
		// password must be >= 6 characters with at least one number, one uppercase and one lowercase letter
		var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
		return re.test(str);
	},
	prettifyDate: function(dateString) {
		var days = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.'];

		// Create an array with the current month, day and time
		var date = [ dateString.getMonth() + 1, dateString.getDate(), dateString.getFullYear() ];

		// Create an array with the current hour, minute and second
		var time = [ dateString.getHours(), dateString.getMinutes() ];

		// Determine AM or PM suffix based on the hour
		var suffix = ( time[0] < 12 ) ? 'AM' : 'PM';

		// Convert hour from military time
		time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

		// If hour is 0, set it to 12
		time[0] = time[0] || 12;

		// If seconds and minutes are less than 10, add a zero
		for ( var i = 1; i < 3; i++ ) {
			if ( time[i] < 10 ) {
				time[i] = '0' + time[i];
			}
		}

		return [days[dateString.getDay()], date.join('/'), time.join(':') + ' ' + suffix];
	}
};