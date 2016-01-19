Meteor.methods({
	checkUsername: function(userId, username) {
		check(userId, String);
		check(username, String);

		if ( userId === this.userId ) {
			if ( username && username.length >= 3 && username.length <= 16 ) {
				// check if username is already in use
				var usernames = Meteor.users.find({ 'profile.name': username }).fetch;
				for ( var i = 0; i !== usernames.length; i++ ) {
					if ( usernames[i].profile.name === username && usernames[i]._id !== this.userId ) {
						throw new Meteor.Error(403, username + ' is already in use!');
					}
				}
				return true;
			} else {
				throw new Meteor.Error(403, 'Username must be between 3 and 16 characters');
			}
		}
	},
	updateProfile: function(userId, data) {
		check(userId, String);
		check(data, { 
			user: Match.Optional(String),
			email: Match.Optional(String),
			role: Match.Optional(String),
			oldpw: Match.Optional(String),
			newpw: Match.Optional(String),
			confirmpw: Match.Optional(String)
		});

		if ( userId === this.userId ) {
			var update = {},
				set;
			var user = Meteor.users.findOne({ _id: this.userId });

			if ( data.user ) {
				// check if username is already in use
				var usernames = Meteor.users.find({ 'profile.name': data.user }).fetch;

				for ( var i = 0; i !== usernames.length; i++ ) {
					if ( usernames[i].profile.name === data.user && usernames[i]._id !== this.userId ) {
						throw new Meteor.Error(403, data.user + ' is already in use!');
					}
				}

				if ( data.user.length < 3 || data.user.length > 16 ) {
					throw new Meteor.Error(403, 'Username must be between 3 and 16 characters.');
				}

				if ( data.user !== user.profile.user ) {
					update['profile.user'] = data.user;
					set = true;
				}
			}

			if ( data.email ) {
				if ( data.email.indexOf('@') !== -1 && data.email.indexOf('.') !== -1 ) {
					if ( data.user !== user.emails[0].address ) {
						update['emails.0.address'] = data.email;
						set = true;
					}
				} else {
					throw new Meteor.Error(403, 'Email must be a valid email address.');
				}
			}

			if ( data.role ) {
				if ( data.role === 'contributor' || data.role == 'editor' || data.role === 'factchecker' || data.role === 'copyeditor' || data.role === 'producer' ) {
					if ( data.role !== user.profile.role ) {
						update['profile.role'] = data.role;
						set = true;
					}
				} else {
					throw new Meteor.Error(403, 'User role must be contributor, editor, fact checker, or producer.');
				}
			}

			if ( set ) {
				console.log(update);
				return Meteor.users.update(this.userId, {
					$set: update
				});
			} else {
				throw new Meteor.Error(403, 'Nothing changed!');
			}
		} else {
			throw new Meteor.Error(500, 'Not authorized.');
		}
	}
});