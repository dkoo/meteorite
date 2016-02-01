Template.storyList.onRendered(function() {
	var main = document.querySelector('main');
	main.classList.remove('showPreview');
});

Template.storyList.helpers({
	stories: function() {
		var user = Meteor.user(),
			filter = {},
			search = Session.get('search') || '',
			limit = Session.get('subLimit') || 10,
			sortDir = Session.get('sortAsc') ? 1 : -1,
			sortBy = Session.get('sortBy') || 'modified',
			sort = Session.get('subSort') || {},
			options,
			results;

		sort[sortBy] = sortDir;

		options = Session.get('subOptions') || {
			limit: limit,
			sort: sort
		};

		if ( user && !Session.get('startSearch') ) {
			filter.owner = user._id;

			Meteor.subscribe('stories', filter, options, search, function(err, response) {
				if ( err ) {
					console.log(err);
				}
				// Session.set('loading', false);
			});

			results = Stories.find( filter, options );
			Session.set('storyCount', results.count());
			return results.count() ? results : false;
		} else {
			return false;
		}
	},
	term: function() {
		return Session.get('search') ? true : false;
	},
	results: function() {
		var count = Session.get('storyCount') || 0,
			term = Session.get('search'),
			story = count === 1 ? 'story' : 'stories';

		return term ? count + ' ' + story + ' with “' + term + '”' : 'No stories.';
	},
	total: function() {
		var count = Counts.get('storyCount'),
			story = count === 1 ? 'story' : 'stories';

		return 'You have ' + count + ' ' + story + '.';
	},
	more: function() {
		var count = Counts.get('storyCount'),
			shown = Session.get('storyCount') || 10;

		return count > shown ? true : false;
	},
	summary: function() {
		if ( this.dek ) {
			return this.dek;
		} else {
			var arr = this.body.split(' '),
				dek = arr.slice(0, 25).join(' ') + '&#160;&#8230;';

			return arr.length >= 25 ? marked(dek) : marked(this.body);
		}
	}
});

Template.storyList.events({
	'click .stories': function(e) {
		Session.set('hideMenu', false);
	},
	'click .new a': function(e) {
		e.preventDefault();

		Meteor.call('create', Meteor.user()._id, function(err, response) {
			if ( err ) {
				console.log(err);
			}
			FlowRouter.go('/editor/' + response);
		});
	},
	'click .more a': function(e) {
		e.preventDefault();

		var limit = Session.get('subLimit') || 10;
		Session.set('subLimit', limit + 10);
	}
});