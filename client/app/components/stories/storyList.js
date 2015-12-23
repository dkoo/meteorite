Template.storyList.events({
	'click a.new': function(e) {
		e.preventDefault();

		Meteor.call('create', Meteor.user()._id, function(err, response) {
			if ( err ) {
				console.log(err);
			}
			console.log(response);
			// FlowRouter.go('/' + response);
		});
	}
});