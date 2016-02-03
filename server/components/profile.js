Meteor.methods({
	checkUsername: function(username) {
		check(username, String);

		if ( username && username.length >= 3 && username.length <= 16 ) {
			// check if username is already in use
			var usernames = Meteor.users.find({ 'username': username }).fetch();
			for ( var i = 0; i !== usernames.length; i++ ) {
				if ( usernames[i].username === username && usernames[i]._id !== this.userId ) {
					throw new Meteor.Error(403, username + ' is already in use!');
				}
			}
			return true;
		} else {
			throw new Meteor.Error(403, 'Username must be between 3 and 16 characters.');
		}
	},
	createNewUser: function(user) {
		check(user, {
			username: String,
			email: String
		});

		if ( user.username && user.username.length >= 3 && user.username.length <= 16 ) {
			// check if username is already in use
			var usernames = Meteor.users.find({ 'username': user.username }).fetch();
			for ( var i = 0; i !== usernames.length; i++ ) {
				if ( usernames[i].username === user.username ) {
					throw new Meteor.Error(403, user.username + ' is already in use!');
				}
			}
		} else {
			throw new Meteor.Error(403, 'Username must be between 3 and 16 characters.');
		}

		if ( user.email.indexOf('@') < 0 && user.email.indexOf('.') < 0 ) {
			throw new Meteor.Error(403, 'Please enter a valid e-mail address.');
		}

		var newUser = Accounts.createUser(user);

		// create the default readme file
		Meteor.call('createReadMe', newUser);

		return Accounts.sendEnrollmentEmail(newUser);
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
				var usernames = Meteor.users.find({ 'username': data.user }).fetch;

				for ( var i = 0; i !== usernames.length; i++ ) {
					if ( usernames[i].username === data.user && usernames[i]._id !== this.userId ) {
						throw new Meteor.Error(403, data.user + ' is already in use!');
					}
				}

				if ( data.user.length < 3 || data.user.length > 16 ) {
					throw new Meteor.Error(403, 'Username must be between 3 and 16 characters.');
				}

				if ( data.user !== user.user ) {
					update['username'] = data.user;
					set = true;
				}
			}

			if ( data.email ) {
				if ( data.email.indexOf('@') !== -1 && data.email.indexOf('.') !== -1 ) {
					if ( data.email !== user.emails[0].address ) {
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
	},
	deleteUser: function(userId) {
		check(userId, String);

		if ( userId === this.userId ) {
			return Meteor.users.remove(userId);
		}
	}
});