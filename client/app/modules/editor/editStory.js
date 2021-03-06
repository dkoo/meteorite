// global vars
cm = undefined;
preview = undefined;
timer = undefined;

Template.editStory.onRendered(function() {
	cm = CodeMirror.fromTextArea(this.find('#editor'), {
		fixedGutter: false,
		lineNumbers: false,
		lineWrapping: true,
		mode: 'markdown'
	})

	// add story title to browser title bar
	document.title = this.data.title ? 'Meteorite: ' + this.data.title : 'Meteorite';

	// load the preview
	preview = this.find('.preview article');
	preview.innerHTML = marked(cm.getValue());

	// fill in meta fields
	var self = this,
		fields = self.findAll('.meta *[contentEditable=true]'),
		field;

	for ( var i = 0; i !== fields.length; i++ ) {
		field = fields[i];

		field.textContent = self.data[field.className] || '';
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
	expanded: function(section) {
		return Session.get(section + 'Expanded');
	}
});

Template.editStory.events({
	'click .preview': function(e) {
		Session.set('hideMenu', false);
	},
	'touchstart .editor': function(e) {
		cm.refresh();
	},
	'click .expand': function(e) {
		e.preventDefault();

		var parent = e.currentTarget.parentNode,
			section = parent.classList[0];

		Meteor.helpers.sessionToggle(section + 'Expanded');

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
			Meteor.call('update', this._id, Meteor.user()._id, field, input);
			if ( field === 'title' ) {
				document.title = input ? 'Meteorite: ' + input : 'Meteorite';
			}
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
				Meteor.call('update', self._id, Meteor.user()._id, 'body', input);
			}
		}, 1000);
	},
	'transitionend .editor': function(e) {
		// refresh CodeMirror editor when resized
		cm.refresh();
	}
});