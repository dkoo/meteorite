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
	'click .trashStory .ok': function(e) {
		e.preventDefault();

		var storyId = FlowRouter.getParam('id');

		Meteor.call('trash', storyId, Meteor.user()._id, function(err, response) {
			if ( err ) {
				console.log(err);
			}
			FlowRouter.go('/');
			Session.set('modal', undefined);
		});
	},
	'click .deletePermanently .ok': function(e) {
		e.preventDefault();

		var storyId = FlowRouter.getParam('id');

		Meteor.call('delete', storyId, Meteor.user()._id, function(err, response) {
			if ( err ) {
				console.log(err);
			}
			FlowRouter.go('/');
			Session.set('modal', undefined);
		});
	},
	'click .cancel': function(e) {
		e.preventDefault();
		Session.set('modal', undefined);
	}
});