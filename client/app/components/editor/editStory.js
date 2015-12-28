body = false;

Template.editStory.onRendered(function() {
	var self = this,
		fields = self.findAll('.meta *'),
		field;

	for ( var i = 0; i !== fields.length; i++ ) {
		field = fields[i];

		field.textContent = self.data[field.className];
	}
});

Template.editStory.helpers ({
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
	parse: function(field) {
		return marked(this[field]) || marked('');
	}
});

Template.editStory.events({
	'blur .meta *': function(e, template) {
		var field = e.currentTarget.className,
			input = e.currentTarget.textContent;

		if ( input && input !== this[field] ) {
			Meteor.call('update', this._id, field, input);
		}
	},
	'keyup .editor .field, keyup .CodeMirror': function(e, template) {
		var field = e.currentTarget.classList.contains('CodeMirror') ? 'body' : e.currentTarget.id,
			input;

		if ( field === 'body' ) {
			if ( !body ) {
				body = this.find('editor');
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