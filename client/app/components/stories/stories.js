Template.stories.events({
	'click main': function(e) {
		// close dropdown menus
		var links = document.querySelectorAll('#topbar li.open');

		document.body.classList.remove('sideMenu');
		
		for ( var i = 0; i !== links.length; i++ ) {
			links[i].classList.remove('open');
		}
	},
	'scroll main': function(e) {
		if ( Session.get('viewing') === 'story' ) {
			var scrolled = e.target.scrollTop,
				timer = Date.now();

			var old = Session.get('scrolled') || {
				scrolled: 0,
				timer: 0
			};

			if ( timer > old.timer + 250 ) {
				if ( scrolled > old.scrolled && scrolled > 100 ) {
					Session.set('hideMenu', true);
				} else {
					Session.set('hideMenu', false);
				}

				Session.set('scrolled', {
					scrolled: scrolled,
					timer: timer
				});
			} else {
				if ( scrolled < 101 ) {
					Session.set('hideMenu', false);
				}
			}
		} else {
			return false;
		}
	}
});