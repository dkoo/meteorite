Meteor.methods({
	create: function(userId) {
		check(userId, String);

		if ( userId === this.userId ) {
			var update = {
				owner: this.userId,
				createdAt: Date.now(),
				title: 'Untitled story',
				body: 'Story content goes here. Try typing some **Markdown**!',
				status: 'draft'
			};

			return Stories.insert(update);
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	update: function(id, userId, field, input) {
		check(id, String);
		check(userId, String);
		check(field, String);
		check(input, String);

		if ( userId === this.userId ) {
			var update = {};

			update[field] = input;

			return Stories.update(id, {
				$set: update
			});
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	delete: function(id, userId) {
		check(id, String);
		check(userId, String);
		if ( userId === this.userId ) {
			var story = Stories.findOne({ _id: id }),
				oldStatus = story.status,
				update = {
					status: {
						date: Date.now(),
						current: 'trash',
						old: oldStatus
					}
				};

			console.log(update);

			return Stories.update(id, {
				$set: update
			});
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	undelete: function(id, userId) {
		check(id, String);
		check(userId, String);
		var story = Stories.findOne({ _id: id }),
			oldStatus = story.status;

		if ( userId === this.userId ) {
			if ( story.status.old === 'trash' ) {
				var update = {
						status: oldStatus.old
					};

				console.log(update);

				return Stories.update(id, {
					$set: update
				});
			} else {
				throw new Meteor.Error(500, 'Trying to undelete a story not in trash.');
			}
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	}
});