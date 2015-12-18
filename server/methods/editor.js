Meteor.methods({
	udpateBody: function(id, text) {
		check(text, String);

		return Articles.update(id, {
			$set: {
				body: text
			}
		});
	}
});