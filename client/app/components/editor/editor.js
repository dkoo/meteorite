body = false;

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
	show: function(field) {
		if ( field === 'title' ) {
			var html ='<h1 contentEditable="true" class="title">' + this.title + '</h1>';
		}

		return html;
	},
	parse: function(field) {
		return marked(this[field]) || marked('');
	}
});

Template.editor.events({
	'keyup .editor .meta h1, keyup .CodeMirror': function(e, template) {
		var field = e.currentTarget.classList.contains('CodeMirror') ? 'body' : e.currentTarget.className,
			input;

		if ( field === 'body' ) {
			if ( !body ) {
				body = document.getElementById('editor');
			}
			input = body.value;
		} else {
			input = e.target.textContent;
		}

		if ( input !== this[field] ) {
			Meteor.call('update', this._id, field, input);
		}
	} //,
	// 'keyup .CodeMirror': function(e, template) {
	// 	var input = document.getElementById('editor').value;

	// 	if ( input !== this.body) {
	// 		Meteor.call('updateBody', this._id, input);
	// 	}
	// }
});