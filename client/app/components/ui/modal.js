Template.modal.helpers({
	data: function() {
		return Session.get('modal');
	},
	parse: function(str) {
		return marked(str);
	},
	showButtons: function() {
		var html = '',
			buttons = this.buttons;

		if ( buttons && buttons.length ) {
			for ( var i = 0; i !== buttons.length; i++ ) {
				html += '<button class="' + buttons[i] + '">' + buttons[i] + '</button>';
			}
		}

		return html;
	}
});

Template.modal.events({
	'click .ok': function(e) {
		e.preventDefault();

		FlowRouter.go('/');
		Session.set('modal', undefined);
	},
	'click .cancel': function(e) {
		e.preventDefault();
		Session.set('modal', undefined);
	}
});