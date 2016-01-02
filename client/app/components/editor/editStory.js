// global vars
body = undefined;
cm = undefined;
preview = undefined;
timer = undefined;

Template.editStory.onRendered(function() {
	// cache the CodeMirror textarea & preview element
	// body = this.find('#editor');
	body = this.find('#editor');

	cm = CodeMirror.fromTextArea(body, {
		fixedGutter: false,
		lineNumbers: false,
		lineWrapping: true,
		mode: 'markdown'
	})

	preview = this.find('.preview article');

	preview.innerHTML = marked(cm.getValue());

	var self = this,
		fields = self.findAll('.meta *[contentEditable=true]'),
		field;

	for ( var i = 0; i !== fields.length; i++ ) {
		field = fields[i];

		field.textContent = self.data[field.className];
	}

	// bugfix for CodeMirror cursor positioning bug
	var main = document.querySelector('main'),
		refresh = function() {
			cm.refresh();
			main.removeEventListener('scroll', refresh);
		};

	main.addEventListener('scroll', refresh);
});

Template.editStory.helpers ({
	parse: function(field) {
		return marked(body.value) || '';
	},
	expanded: function(section) {
		return Session.get(section + 'Expanded');
	}
});

Template.editStory.events({
	'click .expand': function(e) {
		e.preventDefault();

		var parent = e.currentTarget.parentNode,
			section = parent.classList[0];

		Meteor.utils.sessionToggle(section + 'Expanded');

		parent.parentNode.classList.toggle(section);
	},
	'paste .meta *[contentEditable=true]': function(e) {
		e.preventDefault();

		// allow pasting of plain text only
		var text = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
		document.execCommand('insertText', false, text);
	},
	'blur .meta *[contentEditable=true]': function(e) {
		var field = e.currentTarget.className,
			input = e.currentTarget.textContent;

		if ( input && input !== this[field] ) {
			Meteor.call('update', this._id, field, input);
		}
	},
	'keydown .meta *[contentEditable=true]': function(e) {
		// when the user hits enter, blur field to save input
		if ( e.keyCode === 13 ) {
			e.preventDefault();
			e.currentTarget.blur();
		}
	},
	'input .CodeMirror, keyup .CodeMirror, paste .CodeMirror': function(e, t) {
		var self = this,
			input = cm.getValue();

		preview.innerHTML = marked(input);

		if ( !!timer ) {
			clearTimeout(timer);
		}

		// call update method only once user has stopped typing for 1 second
		timer = setTimeout(function() {
			if ( input !== self.body ) {
				Meteor.call('update', self._id, 'body', input);
			}
		}, 1000);
	},
	'transitionend .editor': function(e) {
		// refresh CodeMirror editor when resized
		cm.refresh();
	}
});