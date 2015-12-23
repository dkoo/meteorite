Template.stories.helpers({
	stories: function() {
		var filter = {},
			results;

		Meteor.subscribe('stories');

		results = Stories.find( filter, { sort: { published: -1 } } );

		return results.count() ? results : false;
	}
});