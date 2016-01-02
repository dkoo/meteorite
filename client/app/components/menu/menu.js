Template.menu.helpers({
	viewing: function(what) {
		return Session.get('viewing') === what;
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
	'click .export a': function(e) {
		e.preventDefault();
		var editor = document.querySelector('.editor'),
			filetype = e.currentTarget.className,
			format = filetype === 'md' ? 'plain' : 'html',
			data = Blaze.getData(editor),
			content = filetype === 'md' ? data.body : '<!DOCTYPE html>\n<html>\n<head>\n\t<title>' + data.title + '</title>\n\t<meta name="author" content="' + data.author + '">\n\t<meta name="description" content="' + data.dek + '">\n</head>\n<body>\n' + marked(data.body) + '</body>\n</html>',
			body = 'data:text/' + format + ';charset=utf-8,' + encodeURIComponent(content);
			a = document.getElementById('#download') || document.createElement('a');

		a.id = 'download';
		a.href = body;
		a.download = Meteor.utils.makeSlug(data.title) + '.' + filetype;

		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
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