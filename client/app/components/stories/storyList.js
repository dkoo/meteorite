Template.storyList.onRendered(function() {
	document.title = 'Meteorite';
});

Template.storyList.helpers({
	stories: function() {
		var user = Meteor.user(),
			filter = {},
			search = Session.get('search') || '',
			limit = Session.get('subLimit') || 10,
			options = Session.get('subOptions') || {
				limit: limit,
				sort: { modified: -1 }
			},
			results;

		if ( user ) {
			filter.owner = user._id;

			Meteor.subscribe('stories', filter, options, search, function(err, response) {
				if ( err ) {
					console.log(err);
				}
				// Session.set('loading', false);
			});

			results = Stories.find( filter, { sort: { modified: -1 } } );
			return results.count() ? results : false;
		} else {
			return false;
		}
	}
});

Template.storyList.events({
	'click a.new': function(e) {
		e.preventDefault();

		Meteor.call('create', Meteor.user()._id, function(err, response) {
			if ( err ) {
				console.log(err);
			}
			FlowRouter.go('/editor/' + response);
		});
	}
});