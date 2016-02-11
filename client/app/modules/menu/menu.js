Template.menu.helpers({
	hideMenu: function() {
		return Session.get('hideMenu');
	},
	showModal: function() {
		if ( !!Session.get('modal') ) {
			return true;
		} else {
			return false;
		}
	},
	active: function(sortBy) {
		var sorted = Session.get('sortBy');
		if ( !sorted && sortBy === 'modified' ) {
			return 'active';
		} else {
			return sortBy === sorted ? 'active' : '';
		}
	},
	dir: function() {
		return Session.get('sortAsc') ? 'asc' : 'desc';
	}
});

Template.menu.events({
	'click #topbar': function(e) {
		if ( e.target.id === 'topbar' ) {
			document.body.classList.remove('sideMenu');

			var links = e.currentTarget.querySelectorAll('.open') || [];

			for ( var i = 0; i !== links.length; i++ ) {
				if ( links[i] !== e.currentTarget.parentNode && !links[i].classList.contains('preview') ) {
					links[i].classList.remove('open');
				}
			}
		}
	},
	'click #burger': function(e) {
		e.preventDefault();
		document.body.classList.toggle('sideMenu');
	},
	'click #topbar > ul > li > a': function(e) {
		if ( !e.currentTarget.classList.contains('search') ) {
			e.preventDefault();

			e.currentTarget.parentNode.classList.toggle('open');
		}

		var links = e.currentTarget.parentNode.parentNode.querySelectorAll('.open') || [];

		for ( var i = 0; i !== links.length; i++ ) {
			if ( links[i] !== e.currentTarget.parentNode && !links[i].classList.contains('preview') ) {
				links[i].classList.remove('open');
			}
		}
	},
	'click a.sort': function(e, t) {
		e.preventDefault();
		var sortBy = Session.get('sortBy') || 'modified',
			active = t.find('.sort .active'),
			button = e.currentTarget.classList;

		if ( button.contains(sortBy) ) {
			// toggle ascending or descending if clicking on the same sort criterion
			Meteor.helpers.sessionToggle('sortAsc');
		} else {
			Session.set('sortBy', button[1]);
			sortBy = button[1];

			// sort alphabetically if criterion is title/byline/owner, or descending if by date
			if ( sortBy === 'title' || sortBy === 'author' || sortBy === 'owner' ) {
				Session.set('sortAsc', true);
			} else {
				Session.set('sortAsc', false);
			}

			active.classList.remove('active');
			e.currentTarget.classList.add('active');
		}
	},
	'click a.export': function(e) {
		e.preventDefault();
		console.log(e.currentTarget.classList);
		var editor = document.querySelector('.editor'),
			filetype = e.currentTarget.classList[1],
			format = filetype === 'md' ? 'plain' : 'html',
			data = Blaze.getData(editor),
			title = data.title || '',
			author = data.author || '',
			body = data.body || '',
			dek = data.dek || '',
			content = filetype === 'md' ? body : '<!DOCTYPE html>\n<html>\n<head>\n\t<title>' + title + '</title>\n\t<meta name="author" content="' + author + '">\n\t<meta name="description" content="' + dek + '">\n</head>\n<body>\n' + marked(body) + '</body>\n</html>',
			href = 'data:text/' + format + ';charset=utf-8,' + encodeURIComponent(content);
			a = document.getElementById('#download') || document.createElement('a');

		a.id = 'download';
		a.href = href;
		a.download = Meteor.utils.makeSlug(data.title) + '.' + filetype;

		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	},
	'click a.delete': function(e) {
		e.preventDefault();

		var editor = document.querySelector('.editor'),
			data = Blaze.getData(editor);

		// if ( data.status.current === 'trash' ) {
			Session.set('modal', {
				key: 'deletePermanently',
				sections: [
					{
						title: 'Delete permanently?',
						message: 'Do you want to **permanently** delete this story? This cannot be undone!',
						buttons: [
							{
								label: 'delete it',
								class: 'warning ok'
							},
							{
								label: 'cancel',
								class: 'cancel'
							}
						]
					}
				]
			});
		// } else {
		// 	Session.set('modal', {
		// 		key: 'trashStory',
		// 		title: 'Delete story',
		// 		message: 'Move this story to trash? Items in trash will be automatically deleted after 30 days.',
		// 		buttons: ['ok', 'cancel']
		// 	});
		// }
	},
	'click .preview a': function(e) {
		e.preventDefault();

		var main = document.querySelector('main');

		e.target.classList.toggle('active');
		main.classList.toggle('showPreview');
	},
	'change input': function(e) {
		var main = document.querySelector('main'),
			setting = e.target.id,
			checked = e.target.checked;

		if ( checked ) {
			main.classList.add(setting);
		} else {
			main.classList.remove(setting);
		}
	}
});