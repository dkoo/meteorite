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

	// global event listeners
	document.body.addEventListener('keydown', function(e) {
		if ( e.keyCode === 27 ) {
			document.body.classList.remove('sideMenu');
			
			if ( !!Session.set('modal') ) {
				Session.set('modal', undefined);
			}
		}
	});
});