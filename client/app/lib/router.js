function reset() {
	Session.set('modal', undefined);
	Session.set('viewing', 'stories');
	Session.set('hideMenu', false);
	Session.set('startSearch', undefined);
	Session.set('search', undefined);
	document.body.classList.remove('sideMenu');
}

// root
FlowRouter.route('/', {
	action: function() {
		reset();
		BlazeLayout.render('stories', {content: 'storyList'});
	}
});

// login/signup routes
var accounts = FlowRouter.group({
	name: 'accounts'
});

accounts.route('/login', {
	action: function() {
		if ( !!Meteor.user() ) {
			FlowRouter.go('/');
		} else {
			BlazeLayout.render('accounts', {content: 'login'});
		}
	}
});

accounts.route('/signup', {
	action: function() {
		if ( !!Meteor.user() ) {
			FlowRouter.go('/');
		} else {
			BlazeLayout.render('accounts', {content: 'signup'});
		}
	}
});

accounts.route('/forgot', {
	action: function() {
		reset();
		BlazeLayout.render('accounts', {content: 'forgot'});
	}
});

FlowRouter.route('/search', {
	action: function() {
		reset();
		BlazeLayout.render('stories', {content: 'search'});
	}
});

// editor routes
var editor = FlowRouter.group({
	prefix: '/editor',
	name: 'editor'
});

editor.route('/', {
	action: function() {
		Session.set('loading', true);
		Meteor.call('create', Meteor.user()._id, function(err, response) {
			if ( err ) {
				console.log(err);
			}
			FlowRouter.go('/editor/' + response);
			Session.set('loading', false);
		});
	}
});

editor.route('/:id', {
	action: function() {
		Session.set('viewing', 'story');
		BlazeLayout.render('stories', {content: 'editor'});
	}
});