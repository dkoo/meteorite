Template.modal.helpers({
	data: function() {
		return Session.get('modal');
	},
	parse: function(str) {
		return str ? marked(str) : false;
	},
	generateField: function() {
		var html = '',
			user = Meteor.user(),
			placeholder;

		switch ( this.id ) {
			case 'user':
				placeholder = user.username || '';
				break;
			case 'email':
				placeholder = user.emails[0].address;
				break;
			default:
				placeholder = '';
		}

		if ( this.type === 'text' || this.type === 'password' ) {
			html = '<label for="' + this.id + '"><span>' + this.label + '</span>';
			html += '<input type="' + this.type + '" id="' + this.id + '" name="' + this.id + '" value="' + placeholder + '">';

			if ( this.legend ) {
				html += '<legend>' + marked(this.legend) + '</legend>';
			}

			html += '</label>';
		} // else if ( this.type === 'select' ) {
		// 	html += '<select name="' + this.id + '">';

		// 	if ( this.options.length ) {
		// 		var value;
		// 		for ( var i = 0; i !== this.options.length; i++ ) {
		// 			value = this.options[i].toLowerCase().replace(/\s+/g, '');
		// 			if ( value === '--select--' ) {
		// 				value = '';
		// 			}
		// 			html += '<option value="' + value + '"'; 

		// 			if ( this.id === 'role' && value === user.profile.role ) {
		// 				html += ' selected';
		// 			}

		// 			html += '>';
		// 			html += this.options[i] + '</option>';
		// 		}
		// 	}
		// }

		if ( this.buttons && this.buttons.length ) {
			html += Meteor.helpers.addButtons(this.buttons);
			// var ok;
			// for ( var i = 0; i !== this.buttons.length; i++ ) {
			// 	ok = this.buttons[i] === 'save' ? ' ok' : '';
			// 	html += '<button class="' + this.buttons[i] + ok + '">' + this.buttons[i] + '</button>';
			// }
		}

		return html;
	},
	showButtons: function() {
		var html = Meteor.helpers.addButtons(this.buttons);
		return html;
	}
});

Template.modal.events({
	// close the modal window on click/tap outside the window
	'click aside.modal': function(e) {
		if ( e.currentTarget === e.target ) {
			Session.set('modal', undefined);
		}
	},
	// confirm trash story
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
	// generic cancel/close buttons dismiss the modal
	'click .cancel, click .close': function(e) {
		e.preventDefault();
		Session.set('modal', undefined);
	},
	// prevent scrolling of background page while modal is active
	'touchmove aside.modal': function(e) {
		if ( e.target.tagName.toLowerCase() === 'main' ) {
			e.preventDefault();
		}
	},
	// all below: form validation for profile editor
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
	'blur .profile form input': function(e) {
		if ( !e.target.value ) {
			var user = Meteor.user();
			if ( e.target.id === 'user' || e.target.id === 'email' ) {
				e.target.value = e.target.id === 'user' ? user.username : user.emails[0].address;
			}

			e.target.parentNode.classList.remove('invalid');
			e.target.parentNode.classList.remove('valid');
		}
	},
	// validate username on the fly
	'input .profile form #user': function(e) {
		Meteor.call('checkUsername', e.target.value, function(err, response) {
			if ( err ) {
				e.target.parentNode.classList.remove('valid');
				e.target.parentNode.classList.add('invalid');
			} else {
				e.target.parentNode.classList.remove('invalid');
				e.target.parentNode.classList.add('valid');
			}
		});
	},
	'input .profile form #newpw': function(e, t) {
		if ( Meteor.utils.validPassword(e.target.value) ) {
			e.target.parentNode.classList.remove('invalid');
			e.target.parentNode.classList.add('valid');
		} else {
			e.target.parentNode.classList.remove('valid');
			e.target.parentNode.classList.add('invalid');
		}
	},
	'input .profile form #confirmpw': function(e, t) {
		var newpw = t.find('#newpw');

		if ( newpw.value === e.target.value ) {
			e.target.parentNode.classList.add('valid');
			e.target.parentNode.classList.remove('invalid');
		} else {
			e.target.parentNode.classList.remove('valid');
			e.target.parentNode.classList.add('invalid');
		}
	},
	'submit .profile form': function(e) {
		e.preventDefault();
		var data = {},
			user = Meteor.user(),
			messages = [];

		if ( e.target.user.value ) {
			if ( e.target.user.value !== user.username ) {
				data.user = e.target.user.value;
			}
		} else {
			messages.push('Your account must have a username.');
		}

		if ( e.target.email.value ) {
			if ( e.target.email.value !== user.emails[0].address ) {
				data.email = e.target.email.value;
			}
		}

		// if ( e.target.role.value ) {
		// 	if ( e.target.role.value === 'contributor' || e.target.role.value == 'editor' || e.target.role.value === 'factchecker' || e.target.role.value === 'copyeditor' || e.target.role.value === 'producer' ) {
		// 		if ( e.target.role.value !== user.profile.role ) {
		// 			data.role = e.target.role.value;
		// 		}
		// 	}
		// } else {
		// 	messages.push('Please select a user role.');
		// }

		if ( e.target.newpw.value ) {
			var valid = true;

			if ( !e.target.oldpw.value ) {
				messages.push('Please enter your current password to change your password.');
				valid = false;
			}

			// validate password
			if ( !Meteor.utils.validPassword(e.target.newpw.value) ) {
				messages.push('Passwords must be at least 6 characters and contain at least one number, one uppercase and one lowercase letter.');
				valid = false;
			}
			// if new pw and confirm pw fields match
			if ( e.target.newpw.value !== e.target.confirmpw.value ) {
				messages.push('New password and confirm password fields must match.');
				valid = false;
			}

			if ( !valid ) {
				Meteor.helpers.appendMessages(e.target, messages);
				return false;
			} else {
				// change the password
				Accounts.changePassword(e.target.oldpw.value, e.target.newpw.value, function(err, response) {
					if ( err ) {
						console.log(err);
						messages.push(err.reason);
					} else {
						messages.push('Password updated!');
						e.target.oldpw.value = '';
						e.target.newpw.value = '';
						e.target.confirmpw.value = '';
					}
					if ( messages.length ) {
						Meteor.helpers.appendMessages(e.target, messages);
					}
				});
			}
		}

		if ( data.user || data.email || data.role ) {
			Meteor.call('updateProfile', Meteor.user()._id, data, function(err, response) {
				if ( err ) {
					console.log(err);
					messages.push(err.reason);
				} else {
					messages.push('Changes saved!');
				}

				if ( messages.length ) {
					Meteor.helpers.appendMessages(e.target, messages);
				}
			});
		} else {
			if ( !e.target.newpw.value || !e.target.confirmpw.value ) {
				Meteor.helpers.appendMessages(e.target, ['Nothing changed!']);
			}
		}
	},
	'click .profile .deleteAccount': function(e) {
		e.preventDefault();

		Session.set('modal', {
			key: 'deleteAccount',
			sections: [
				{
					title: 'Delete Account',
					message: 'Warning: this can’t be undone. Are you **sure** you want to delete your account **permanently**? All stories will be deleted from the server and will be unrecoverable.',
					buttons: [
						{
							label: 'delete me',
							class: 'warning delete'
						},
						{
							label: 'cancel',
							class: 'cancel'
						}
					]
				}
			]
		})
	},
	'click .deleteAccount .delete': function(e) {
		e.preventDefault();
		Session.set('loading', true);
		Session.set('messages', ['Account deleted.']);
		Meteor.call('deleteUser', Meteor.user()._id, function(err, response) {
			if ( err ) {
				console.log(err);
			}

			Session.set('loading', false);

		});
	}
});