Template.editor.helpers({
	story: function() {
		var storyId = FlowRouter.getParam('id');
		Meteor.subscribe('stories', { _id: storyId, owner: Meteor.user()._id }, {}, '', function(err, response) {
			if ( err ) {
				console.log(error);
			}
		});

		var story = Stories.findOne({_id: storyId});

		return story;
	}
});