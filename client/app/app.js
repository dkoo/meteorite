Meteor.startup(function() {
	// marked config options
	marked.setOptions({
		gfm: true,
		breaks: true,
		sanitize: true,
		smartypants: true
	});
});