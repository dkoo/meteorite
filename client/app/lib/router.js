FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render('stories', {content: 'storyList'});
    }
});

var editor = FlowRouter.group({
	prefix: '/editor',
	name: 'editor'
});

editor.route('/:id', {
	action: function() {
        BlazeLayout.render('stories', {content: 'editor'});
	}
});