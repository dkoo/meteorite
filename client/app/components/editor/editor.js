Template.editor.helpers({
	story: function() {
		Meteor.subscribe('stories');
		return Stories.findOne({title: 'test article'});
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

		Articles.update(this._id, {
			$set: {
				body: text
			}
		});
		// Meteor.call('updateBody', this._id, text);
	}
});