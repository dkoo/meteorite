Meteor.startup(function() {
	var trash = Stories.find({ 'status.current': 'trash' }).fetch(),
		days;

	// check for trashed stories and delete those trashed 30+ days ago
	for ( var i = 0; i !== trash.length; i++ ) {
		days = new Date(trash[i].status.date + 30 * 24 * 3600 * 1000);
		console.log(days);
	}
});