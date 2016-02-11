Template.stories.events({
	'click main': function(e) {
		// close dropdown menus
		var links = document.querySelectorAll('#topbar li.open');

		document.body.classList.remove('sideMenu');

		for ( var i = 0; i !== links.length; i++ ) {
			if ( !links[i].classList.contains('preview') ) {
				links[i].classList.remove('open');
			}
		}
	},
	'scroll main': function(e) {
		var viewing =  Session.get('viewing');
		
		// close meta when scrolling (to avoid awkward double overflow)
		e.target.classList.remove('meta');
		Session.set('metaExpanded', false);

		if ( viewing === 'story' ) {
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
		} else if ( viewing === 'stories' ) {
			// infinite scroll
			if ( viewing === 'stories' ) {						
				if ( e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight - 50 ) {
					var count = Counts.get('storyCount'),
						shown = Session.get('storyCount') || 0,
						limit = Session.get('subLimit') || 10;
					if ( count > shown ) {
						Session.set('subLimit', limit + 10);
					}
				}
			}
		} else {
			return false;
		}
	}
});