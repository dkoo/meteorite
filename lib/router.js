// reusable function to reset application states
function reset() {
	Session.set('modal', undefined);
	Session.set('viewing', 'stories');
	Session.set('hideMenu', false);
	Session.set('startSearch', undefined);
	Session.set('search', undefined);
	Session.set('searching', undefined);
	document.body.classList.remove('sideMenu');

	var preview = document.querySelector('#topbar .preview');
	if ( preview ) {
		preview.classList.remove('open');
	}
}

FlowRouter.notFound = {
	action: function() {
		Session.set('loading', true);
		FlowRouter.go('/');
	}
};

// root
FlowRouter.route('/', {
	subscriptions: function(params, queryParams) {
		var user = this.userId;

		if ( user ) {
			var filter = {},
				search = '',
				limit = 10,
				sortDir = -1,
				sortBy = 'modified',
				sort = {},
				options,
				results;

			sort[sortBy] = sortDir;

			options = {
				limit: limit,
				sort: sort
			};
			filter.owner = user;
			this.register('stories', Meteor.subscribe('stories', filter, options, search));
		}
	},
	action: function() {
		if ( Meteor.isClient ) {
			reset();
			document.title = 'Meteorite';
			Session.set('loading', false);
			BlazeLayout.render('stories', {content: 'storyList'});
		}
	}
});

// login/signup routes
var accounts = FlowRouter.group({
	name: 'accounts'
});

accounts.route('/login', {
	action: function() {
		if ( Meteor.isClient ) {
			if ( !!Meteor.user() ) {
				FlowRouter.go('/');
			} else {
				reset();
				document.title = 'Meteorite: Log In';
				BlazeLayout.render('accounts', {content: 'login'});
			}
		}
	}
});

accounts.route('/signup', {
	action: function() {
		if ( Meteor.isClient ) {
			if ( !!Meteor.user() ) {
				FlowRouter.go('/');
			} else {
				document.title = 'Meteorite: Sign Up';
				BlazeLayout.render('accounts', {content: 'signup'});
			}
		}
	}
});

accounts.route('/forgot', {
	action: function() {
		if ( Meteor.isClient ) {
			reset();
			document.title = 'Meteorite: Forgot Password';
			BlazeLayout.render('accounts', {content: 'forgot'});
		}
	}
});

FlowRouter.route('/search', {
	action: function() {
		if ( Meteor.isClient ) {
			reset();
			document.title = 'Meteorite: Search';
			Session.set('searching', true);
			BlazeLayout.render('stories', {content: 'search'});
		}
	}
});

// editor routes
var editor = FlowRouter.group({
	prefix: '/editor',
	name: 'editor'
});

editor.route('/', {
	action: function() {
		if ( Meteor.isClient ) {
			reset();
			Session.set('loading', true);
			Meteor.call('create', Meteor.user()._id, function(err, response) {
				if ( err ) {
					console.log(err);
				}
				FlowRouter.go('/editor/' + response);
				Session.set('loading', false);
			});
		}
	}
});

editor.route('/:id', {
	subscriptions: function(params, queryParams) {
		this.register('story', Meteor.subscribe('stories', { _id: params.id, owner: this.userId }, {}, ''));
	},
	action: function() {
		if ( Meteor.isClient ) {
			reset();
			Session.set('viewing', 'story');
			BlazeLayout.render('stories', {content: 'editor'});
		}
	}
});