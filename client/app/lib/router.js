// root

FlowRouter.route('/', {
    action: function() {
		Session.set('viewing', 'stories');
		Session.set('hideMenu', false);
		document.body.classList.remove('sideMenu');
        BlazeLayout.render('stories', {content: 'storyList'});
    }
});

// login/signup routes
var accounts = FlowRouter.group({
	name: 'accounts'
});

accounts.route('/login', {
	action: function() {
		BlazeLayout.render('accounts', {content: 'login'});
	}
});

accounts.route('/signup', {
	action: function() {
		BlazeLayout.render('accounts', {content: 'signup'});
	}
});

accounts.route('/forgot', {
	action: function() {
		BlazeLayout.render('accounts', {content: 'forgot'});
	}
});

// editor routes
var editor = FlowRouter.group({
	prefix: '/editor',
	name: 'editor'
});

editor.route('/', {
	action: function() {
		Meteor.call('create', Meteor.user()._id, function(err, response) {
			if ( err ) {
				console.log(err);
			}
			FlowRouter.go('/editor/' + response);
		});
	}
});

editor.route('/:id', {
	action: function() {
		Session.set('viewing', 'story');
		BlazeLayout.render('stories', {content: 'editor'});
	}
});