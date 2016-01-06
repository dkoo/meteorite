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
	},
	'scroll main': function(e) {
		var scrolled = e.target.scrollTop,
			timer = Date.now();
		if ( Session.get('viewing', 'story') ) {
			var old = Session.get('scrolled') || {
				scrolled: 0,
				timer: 0
			};

			if ( timer > old.timer + 250 ) {
				if ( scrolled > old.scrolled && scrolled > 100 ) {
					if ( !Session.get('hideMenu') ) {
						Session.set('hideMenu', true);
					}
				} else {
					if ( Session.get('hideMenu') ) {
						Session.set('hideMenu', false);
					}
				}

				Session.set('scrolled', {
					scrolled: scrolled,
					timer: timer
				});
			} else {
				if ( scrolled < 101 && Session.get('hideMenu') ) {
					Session.set('hideMenu', false);
				}
			}
		}
	}
});