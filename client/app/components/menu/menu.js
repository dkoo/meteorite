Template.menu.helpers({
	viewing: function(what) {
		return Session.get('viewing') === what;
	}
});

Template.menu.events({
	'click li > a': function(e) {
		e.preventDefault();
		var links = e.currentTarget.parentNode.parentNode.children;
		
		for ( var i = 0; i !== links.length; i++ ) {
			if ( links[i].className !== e.currentTarget.parentNode.className ) {
				links[i].classList.remove('open');
			}
		}

		e.currentTarget.parentNode.classList.toggle('open');
	}
});