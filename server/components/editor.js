Meteor.methods({
	create: function(userId) {
		check(userId, String);

		if ( userId === this.userId ) {
			var date = Date.now(),
				story = {
					owner: this.userId,
					createdAt: date,
					modified: date,
					title: 'Untitled story',
					body: 'Story content goes here. Try typing some **Markdown**!',
					status: 'draft'
				};

			return Stories.insert(story);
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	createReadMe: function(userId) {
		check(userId, String);

		var story = {
			owner: userId,
			createdAt: Date.now(),
			modified: Date.now(),
			title: 'Read Me First!',
			author: 'Derrick Koo',
			dek: 'Some tips for using Meteorite Editor.',
			body: '# Meteorite Editor\n\nMeteorite Editor is a full-featured, open-source, browser-based, mobile-friendly, HTML5 [Markdown](http://daringfireball.net/projects/markdown/) editor with real-time previewing and publishing via REST API.\n\nPowered by the [Meteor](https://www.meteor.com/) framework, Meteorite Editor offers a clean, minimalist writing environment to compose, preview and collaborate on your stories before you publish. For more information or to view the latest source code, please visit the [repository](https://github.com/dkoo).\n\n## How to Use\n\nType some Markdown on the left side and see how it’ll look in HTML on the right. Changes are saved automatically as you type.\n\n### Some More Detail\n\nSee the **Options** menu to:\n* Export your stories in .md or .html format\n* Delete your story (currently irreversible)\n* Toggle increased font size or scroll sync (synchronized scrolling between edit and preview windows)\n\nYou can also:\n\n* Expand any pane in the editor by clicking on the expand icons in the upper-right corner of each pane (desktop only).\n* Toggle editor/preview mode by tapping the eye logo in the top menu bar (mobile only).\n\n## Technical Details\n\nThis application is built on the foundation of several great open-source projects:\n\n* [Meteor](https://www.meteor.com/), a full-stack framework for building reactive JavaScript applications\n* [CodeMirror](https://codemirror.net/), a versatile, browser-based JavaScript text editor\n* [Marked](https://github.com/chjj/marked), a full-featured JavaScript Markdown parser and compiler\n* [FlowRouter](https://github.com/kadirahq/flow-router), a carefully designed client-side router for Meteor\n* [simple:rest](https://github.com/stubailo/meteor-rest/), a handy set of packages for making your Meteor data accessible over HTTP\n* [Jasmine](http://jasmine.github.io/) and [Velocity](https://github.com/meteor-velocity/velocity) for unit testing\n\n### Contributing\n\nI am not officially asking for outside contributions at this early phase of the project, but if you’re interested in contributing, please get in touch.\n\n### Installing\n\n1. Clone the repository\n2. Make sure you have [Meteor](https://www.meteor.com/install) installed\n3. In Terminal, run `meteor` from inside your cloned folder to install local packages and start a local server\n4. Point your browser to http://localhost:3000\n\n## Version\n\n0.1.0. This version is Phase 1 of development. Phase 2 will add offline editing via local storage and revisions management systems. Phase 3 will add multi-user copy editing features. See Future Plans below for more details.\n\n## License\n\n[MIT](https://opensource.org/licenses/MIT). Yay for open source!\n\n## Future Plans\n\nMeteorite Editor was always intended to be a multi-user writing and copy-editing tool for teams of writers. In its current state, it’s single-user only, so that I can concentrate on building a great writing and editing experience first. Here are some of the features I’m planning to implement:\n\n### Phase 1\n\n* Tests\n* Expose finished stories to other services via REST API\n\n### Phase 2\n\n* Offline editing via local storage\n* Management of story revisions\n* Story collections to group stories\n* More robust metadata (tagging, etc.)\n* More useful searching and filtering\n* A more forgiving trash system\n\n### Phase 3\n* Create and join teams to collaborate on stories\n* Assign roles to teammates, per story\n* Route story versions to teammates via e-mail\n* Annotate story versions and resolve annotations\n* Approve stories for publication\n\n### ...and Beyond?\n\n* One-click publishing to other services such as Google Drive, Dropbox, or WordPress\n* Custom themes and skins\n\nThanks for visiting, and enjoy!'
		}

		Stories.insert(story);
	},
	update: function(id, userId, field, input) {
		check(id, String);
		check(userId, String);
		check(field, String);
		check(input, String);

		if ( userId === this.userId ) {
			var update = {};

			update[field] = input;
			update.modified = Date.now();

			return Stories.update(id, {
				$set: update
			});
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	trash: function(id, userId) {
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

			return Stories.update(id, {
				$set: update
			});
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	},
	untrash: function(id, userId) {
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
	},
	delete: function(id, userId) {
		check(id, String);
		check(userId, String);
		if ( userId === this.userId ) {
			return Stories.remove(id);
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	}
});