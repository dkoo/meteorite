Template.menu.helpers({
	viewing: function(what) {
		return Session.get('viewing') === what;
	},
	hideMenu: function() {
		return Session.get('hideMenu');
	},
	showModal: function() {
		if ( !!Session.get('modal') ) {
			return true;
		} else {
			return false;
		}
	}
});

Template.menu.events({
	'click #topbar > ul > li > a': function(e) {
		e.preventDefault();
		var links = e.currentTarget.parentNode.parentNode.children;
		
		for ( var i = 0; i !== links.length; i++ ) {
			if ( links[i].className !== e.currentTarget.parentNode.className ) {
				links[i].classList.remove('open');
			}
		}

		e.currentTarget.parentNode.classList.toggle('open');
	},
	'click a.export': function(e) {
		e.preventDefault();
		var editor = document.querySelector('.editor'),
			filetype = e.currentTarget.className,
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
		Session.set('modal', {
			key: 'deleteStory',
			title: 'Delete story',
			message: 'Move this story to **trash**? Items in trash will be automatically deleted after 30 days.',
			buttons: ['ok', 'cancel']
		});
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