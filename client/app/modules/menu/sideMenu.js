Template.sideMenu.events({
	'click .about': function(e) {
		e.preventDefault();

		Session.set('modal', {
			key: 'about',
			sections: [
				{
					title: 'About Meteorite Editor',
					message: 'Meteorite Editor is a full-featured, open-source, cloud-based, mobile-friendly, HTML5 [Markdown](http://daringfireball.net/projects/markdown/) editor with real-time in-browser previewing and publishing via REST API.\n\nPowered by the [Meteor](https://www.meteor.com/) framework, Meteorite Editor offers a clean, minimalist writing environment to compose, preview and collaborate on your stories before you publish. For more information or to view the latest source code, please visit the [repository](https://github.com/dkoo).\n\nThis application is hosted for free by the [author](https://github.com/dkoo) for demo purposes only. Feel free to use it and export your stories for your personal use, but please don’t expect any data or user information to persist. You are welcome to download the source code and host your own deployment, but please keep in mind that it’s a work in progress. Check the repository for updates.',
					buttons: [{
						label: 'close',
						class: 'close'
					}]
				}
			]
		});
	},
	'click .markdown': function(e) {
		e.preventDefault();

		Session.set('modal', {
			key: 'markdown',
			sections: [
				{
					title: 'Markdown Cheatsheet',
					message: '[Markdown](https://daringfireball.net/projects/markdown/) is an easy-to-write plain-text syntax ideal for writing for digital media. Meteorite Editor uses [GitHub-Flavored Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) (GFM). This cheatsheet is adapted from GitHub’s.\n\n#### Headers\n```\n# h1\n## h2\n...\n###### h6\n```\n\n#### Emphasis\n\n```\n*italic*\n**bold**\n***bold italic***\n~~strikethrough~~\n```\n\n#### Lists\n\n```\n* unordered list item 1\n  - nested list item\n* unordered list item 2\n\n1. ordered list item 1\n  - nested list item\n2. orered list item 2\n```\n\n#### Links\n\n```\n[Link text](http://url/)\n```\n\n#### Images\n\nNote that Meteorite cannot not host any assets internally.\n\n```\n[!alt text](http://imageurl)\n```\n\n#### Code\n\n```\n`var s = \'Hello World\'`\n```\n\nMeteorite also supports [fenced code](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#code-and-syntax-highlighting), as per GFM.\n\n#### Blockquotes\n\n```\n> Some text.\n> Consecutive blockquotes will be combined into a single container.\n```\n\n#### Horizontal Rules\n\nThree or more consecutive:\n\n```\nhyphens: ---\nasterisks: ***\nunderscores: ___\n```\n\n#### Line Breaks\n\nMeteorite conforms to the [GFM treatment of line breaks](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#code-and-syntax-highlighting). Single line breaks result in a `<br>`, while double line breaks denote a paragraph break.',
					buttons: [{
						label: 'close',
						class: 'close'
					}]
				}
			]
		});
	},
	'click .profile': function(e) {
		e.preventDefault();

		Session.set('modal', {
			key: 'profile',
			sections: [
				{
					title: 'Profile Settings',
					message: 'Edit your user profile information below.',
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
						// {
						// 	type: 'select',
						// 	id: 'role',
						// 	label: 'User Role',
						// 	options: ['-- select --', 'Contributor', 'Editor', 'Fact Checker', 'Copy Editor', 'Producer']
						// },
						{
							type: 'password',
							id: 'oldpw',
							label: 'Current Password',
							legend: 'Forgot your password? [Reset it here](/forgot).'
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
						},
						{
							buttons: [
								{
									label: 'save',
									class: 'save ok'
								},
								{
									label: 'close',
									class: 'close'
								}
							]
						}
					]
				},
				{
					title: 'Or, Delete Your Account',
					message: 'Warning: this cannot be undone. Your account and all your stories will be deleted permanently.',
					buttons: [{
						label: 'Delete my account',
						class: 'deleteAccount warning'
					}]
				}
			]
		});
	},
	'click .logout': function(e) {
		e.preventDefault();
		Meteor.logout(function() {
			Session.set('messages', ['Successfully logged out.']);
			FlowRouter.go('/login');
		});
	}
});