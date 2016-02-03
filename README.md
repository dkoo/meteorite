# Meteorite Editor

Meteorite Editor is a full-featured, open-source, cloud-based, mobile-friendly, HTML5 [Markdown](http://daringfireball.net/projects/markdown/) editor with real-time in-browser previewing and publishing via REST API.

Powered by the [Meteor](https://www.meteor.com/) framework, Meteorite Editor offers a clean, minimalist writing environment to compose, preview and collaborate on your stories before you publish. For more information or to view the latest source code, please visit the [repository](https://github.com/dkoo).

## How to Use

Type some Markdown on the left side and see how it’ll look in HTML on the right. Changes are saved automatically as you type.

### Some More Detail

See the **Options** menu to:
* Export your stories in .md or .html format
* Delete your story (currently irreversible)
* Toggle increased font size or scroll sync (synchronized scrolling between edit and preview windows)

You can also:

* Expand any pane in the editor by clicking on the expand icons in the upper-right corner of each pane (desktop only).
* Toggle editor/preview mode by tapping the eye logo in the top menu bar (mobile only).

## Technical Details

This application is built on the foundation of several great open-source projects:

* [Meteor](https://www.meteor.com/), a full-stack framework for building reactive JavaScript applications
* [CodeMirror](https://codemirror.net/), a versatile, browser-based JavaScript text editor
* [Marked](https://github.com/chjj/marked), a full-featured JavaScript Markdown parser and compiler
* [FlowRouter](https://github.com/kadirahq/flow-router), a carefully designed client-side router for Meteor
* [simple:rest](https://github.com/stubailo/meteor-rest/), a handy set of packages for making your Meteor data accessible over HTTP
* [Jasmine](http://jasmine.github.io/) and [Velocity](https://github.com/meteor-velocity/velocity) for unit testing

### Contributing

I am not officially asking for outside contributions at this early phase of the project, but if you’re interested in contributing, please get in touch.

### Installing

1. Clone the repository
2. Make sure you have [Meteor](https://www.meteor.com/install) installed
3. In Terminal, run `meteor` from inside your cloned folder to install local packages and start a local server
4. Point your browser to http://localhost:3000

## Version

0.1.0. This version is Phase 1 of development. Phase 2 will add offline editing via local storage and revisions management systems. Phase 3 will add multi-user copy editing features. See Future Plans below for more details.

## License

[MIT](https://opensource.org/licenses/MIT). Yay for open source!

## Future Plans

Meteorite Editor was always intended to be a multi-user writing and copy-editing tool for teams of writers. In its current state, it’s single-user only, so that I can concentrate on building a great writing and editing experience first. Here are some of the features I’m planning to implement:

### Phase 1

* Unit tests.

### Phase 2

* Offline editing via local storage
* Management of story revisions
* Expose finished stories to other services via REST API
* Story collections to group stories
* More robust metadata (tagging, etc.)
* More useful searching and filtering
* A more forgiving trash system

### Phase 3
* Create and join teams to collaborate on stories
* Assign roles to teammates, per story
* Route story versions to teammates via e-mail
* Annotate story versions and resolve annotations
* Approve stories for publication

### ...and Beyond?

* One-click publishing to other services such as Google Drive, Dropbox, or WordPress
* Custom themes and skins

Thanks for visiting, and enjoy!