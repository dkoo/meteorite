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
	}
});