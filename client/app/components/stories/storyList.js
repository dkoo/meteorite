Template.storyList.onRendered(function() {
	document.title = 'Meteorite';
});

Template.storyList.helpers({
	stories: function() {
		var filter = {},
			results;

		Meteor.subscribe('stories', {});

		results = Stories.find( filter, { sort: { createdAt: -1 } } );

		return results.count() ? results : false;
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