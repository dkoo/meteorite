Template.editor.helpers({
	story: function() {
		var storyId = FlowRouter.getParam('id');
		Meteor.subscribe('stories', { _id: storyId });

		var story = Stories.findOne({_id: storyId});

		return story;
	}
});