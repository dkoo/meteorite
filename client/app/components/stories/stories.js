Template.stories.events({
	'click main': function(e) {
		// close dropdown menus
		var topbar = document.getElementById('topbar'),
			links = topbar.querySelector('ul').children;
		
		for ( var i = 0; i !== links.length; i++ ) {
			if ( links[i].className !== e.currentTarget.parentNode.className ) {
				links[i].classList.remove('open');
			}
		}

		Session.set('hideMenu', false);
	},
	'scroll main': function(e) {
		var scrolled = e.target.scrollTop,
			timer = Date.now();
		if ( Session.get('viewing', 'story') ) {
			var oldScroll = Session.get('scrolled') || {
				scrolled: 0,
				timer: 0
			};

			if ( timer > oldScroll.timer + 250 ) {

				if ( scrolled > oldScroll.scrolled ) {
					if ( scrolled > 100 ) {
						Session.set('hideMenu', true);
					}
				} else {
					Session.set('hideMenu', false);
				}

				Session.set('scrolled', {
					scrolled: scrolled,
					timer: timer
				});
			}
		}
	}
});