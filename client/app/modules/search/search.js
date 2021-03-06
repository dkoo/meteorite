Template.search.onRendered(function() {
	this.find('#search').focus();
	Session.set('startSearch', true);
});

Template.search.events({
	'keyup #search': function(e) {
		if ( e.target.value ) {
			document.title = 'Meteorite: Searching for “' + e.target.value + '”';
			Session.set('startSearch', undefined);
			Session.set('search', e.target.value);
		} else {
			document.title = 'Meteorite: Search';
			Session.set('startSearch', true);
			Session.set('search', undefined);
		}
	}
});