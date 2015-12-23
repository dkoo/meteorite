FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render('stories', {content: 'storyList'});
    }
});

var editor = FlowRouter.group({
	prefix: '/editor',
	name: 'editor'
});

editor.route('/new', {
	action: function() {
        BlazeLayout.render('stories', {content: 'editor'});
	}
});