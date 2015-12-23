Meteor.publish('stories', function(filter) {
	check(filter, {
		_id: Match.Optional(String)
	});

	return Stories.find(filter);
});

