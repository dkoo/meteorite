// show loading screen
Template.registerHelper('loading', function() {
	return Session.get('loading');
});

// is the user in search mode?
Template.registerHelper('searching', function() {
	return Session.get('searching');
});

// check whether logged in
Template.registerHelper('loggedIn', function() {
	return Meteor.user() ? true : false;
});


// viewing stories or story?
Template.registerHelper('viewing', function(what) {
	return Session.get('viewing') === what;
});

// print Date objects in human-readable form
Template.registerHelper('date', function() {
	var date = this.modified || this.createdAt,
		action = this.modified ? 'Modified ' : 'Created ',
		prettyDate = Meteor.utils.prettifyDate(new Date(date));

	return action + prettyDate[0] + ' ' + prettyDate[1] + ' at ' + prettyDate[2];
});

// random utilities
Meteor.helpers = {
	// simple helper to toggle a boolean Session key
	sessionToggle: function(key) {
		if ( Session.get(key) ){
			Session.set(key, false);
		} else {
			Session.set(key, true);
		}
	},
	debounce: function(fn, delay, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) fn.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, delay);
			if (callNow) fn.apply(context, args);
		};
	},
	throttle: function(fn, delay) {
		var wait = false;
		return function () {
			if ( !wait ) {
				fn.call();
				wait = true;
				setTimeout(function () {
					wait = false;
				}, delay);
			}
		}
	},
	appendMessages: function(el, messages) {
		var priorMessages = el.querySelector('.messages');

		// clear out any existing messages
		if ( priorMessages ) {
			priorMessages.parentNode.removeChild(priorMessages);
		};

		if ( Array.isArray(messages) && messages.length ) {
			var ul = document.createElement('ul'),
				li = document.createElement('li'),
				message;

			ul.classList.add('messages');

			for ( var i = 0; i !== messages.length; i++ ) {
				message = li.cloneNode();
				message.textContent = messages[i];
				ul.appendChild(message);
			}

			el.appendChild(ul);
		} else {
			console.log('error: expected an array of messages');
		}
	}
}