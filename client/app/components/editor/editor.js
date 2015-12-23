Template.editor.helpers({
	story: function() {
		var storyId = FlowRouter.getParam('id');
		Meteor.subscribe('stories', {_id: storyId});
		return Stories.findOne({_id: storyId});
	},
	title: function() {
		return this.title || 'Your title here';
	},
	editorOptions: function() {
		return {
			lineNumbers: false,
			lineWrapping: true,
			mode: 'markdown'
		};
	},
	editorCode: function() {
		return this.body || '';
	},
	parsed: function() {
		return marked(this.body) || marked('');
	}
});

Template.editor.events({
	'keyup .CodeMirror': function(e, template) {
		var text = document.getElementById('editor').value;

		Meteor.call('updateBody', this._id, text);
	}
});