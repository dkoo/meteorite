Meteor.startup(function() {
	// marked config options
	marked.setOptions({
		gfm: true,
		breaks: true,
		sanitize: true,
		smartypants: true
	});

	// scroll sync by default
	Session.set('sync', true);
	Session.set('font', false);
});