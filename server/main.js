Meteor.publish('stories', function(filter, options, search) {
	check(filter, {
		_id: Match.Optional(String),
		limit: Match.Optional(Number),
		owner: Match.Optional(String),
		sort: Match.Optional(Object)
	});
	check(options, Object);
	check(search, String);

	// number of stories to publish
	if ( options.limit ) {
		if ( options.limit > Stories.find().count ) {
			options.limit = 0;
		}
	}

	if ( search ) {
		// simple sanitization to strip any tag-like strings
		search = search.replace(/<(?:.|\n)*?>/gm, '');

		filter['$or'] = [
			{ title: { $regex: new RegExp('(?=.*' + search + ').*', 'i') } },
			{ body: { $regex: new RegExp('(?=.*' + search + ').*' + '.*', 'i') } },
			{ tags: { $regex: new RegExp('(?=.*' + search + ').*' + '.*', 'i') } },
			{ createdAt: { $gte: Date.parse(search), $lte: Date.parse(search) + 86400000 } } // date queries should find all stories created within a 24-hour period
		];
	}

	// for phase 1, limit published stories to current user
	filter.owner = this.userId;

	// reactively publish the total number of stories in this collection
	Counts.publish(this, 'storyCount', Stories.find({ owner: this.userId }));
	return Stories.find(filter, options);
});

