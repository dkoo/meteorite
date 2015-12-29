// global vars
body = undefined;
preview = undefined;
timer = undefined;

Template.editStory.onRendered(function() {
	// cache the CodeMirror textarea & preview element
	body = this.find('#editor');
	preview = this.find('.preview');

	preview.innerHTML = marked(body.value);

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
		console.log(body);

		return marked(body.value) || '';
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
	'keyup .CodeMirror': function(e) {
		preview.innerHTML = marked(body.value);
		var self = this;

		if ( !!timer ) {
			clearTimeout(timer);
		}

		// call update method only once user has stopped typing for 1 second
		timer = setTimeout(function() {
			if ( body.value !== self.body ) {
				Meteor.call('update', self._id, 'body', body.value);
			}
		}, 1000);
	},
	'input #editor': function(e) {
		console.log(e.target.value);
	}
	// 'keyup .editor .field, keyup .CodeMirror': function(e, template) {
	// 	var field = e.currentTarget.classList.contains('CodeMirror') ? 'body' : e.currentTarget.id,
	// 		input;

	// 	if ( field === 'body' ) {
	// 		console.log(body);
	// 		if ( !body ) {
	// 			body = document.getElementById('editor');
	// 		}
	// 		input = body.value;
	// 	} else {
	// 		input = e.target.textContent;
	// 	}

	// 	if ( input !== this[field] ) {
	// 		Meteor.call('update', this._id, field, input);
	// 	}
	// }
});