Template.sideMenu.events({
	'click .about': function(e) {
		e.preventDefault();

		Session.set('modal', {
			key: 'about',
			title: 'About Meteorite Editor',
			message: 'Meteorite Editor is an open-source, full-featured, cloud-based, mobile-friendly, HTML5 [Markdown](http://daringfireball.net/projects/markdown/) editor with real-time in-browser previewing and publishing via REST API.\n\nPowered by the [Meteor](https://www.meteor.com/) framework, Meteorite Editor offers a clean, minimalist writing environment to compose, preview and collaborate on your stories before you publish. For more information or to view the latest source code, please visit the [repository](https://github.com/dkoo).\n\nThis application is hosted for free by the [author](https://github.com/dkoo) for demo purposes only. Feel free to use it and export your stories for your personal use, but please don’t expect any data or user information to persist. You are welcome to download the source code and host your own deployment, but please keep in mind that it’s a work in progress. Check the repository for updates.',
			buttons: ['close']
		});
	},
	'click .profile': function(e) {
		e.preventDefault();

		Session.set('modal', {
			key: 'profile',
			title: 'Edit Profile',
			message: 'Change your user profile information below.',
			form: [
				{
					type: 'text',
					id: 'user',
					label: 'Username',
				},
				{
					type: 'text',
					id: 'email',
					label: 'E-mail Address'
				},
				{
					type: 'select',
					id: 'role',
					label: 'User Role',
					options: ['-- select --', 'Contributor', 'Editor', 'Fact Checker', 'Copy Editor', 'Producer']
				},
				{
					type: 'password',
					id: 'oldpw',
					label: 'Current Password',
				},
				{
					type: 'password',
					id: 'newpw',
					label: 'New Password'
				},
				{
					type: 'password',
					id: 'confirmpw',
					label: 'New Password Again'
				}
			],
			buttons: ['save', 'close']
		});
	}
});