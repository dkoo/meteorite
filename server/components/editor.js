Meteor.methods({
	create: function(userId) {
		check(userId, String);

		if ( userId === this.userId ) {
			var update = {
				owner: this.userId,
				createdAt: new Date(),
				title: 'New Story',
				summary: 'A short summary or excerpt',
				body: 'Story content goes *here*',
				status: 'draft'
			};

			return Stories.insert(update);
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	update: function(id, field, input) {
		check(field, String);
		check(input, String);

		var update = {};

		update[field] = input;

		return Stories.update(id, {
			$set: update
		});
	}
});