FlowRouter.route('/', {
    action: function() {
		Session.set('viewing', 'stories');
        BlazeLayout.render('stories', {content: 'storyList'});
    }
});

var editor = FlowRouter.group({
	prefix: '/editor',
	name: 'editor'
});

editor.route('/:id', {
	action: function() {
		Session.set('viewing', 'story');
		BlazeLayout.render('stories', {content: 'editor'});
	}
});