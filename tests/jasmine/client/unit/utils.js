describe('utils', function() {
	it('converts a title to a filename with hyphens', function() {
		var title = 'This is a test title';
		var titleWithPunctuation = 'Here’s a test title for you.';

		expect(Meteor.utils.makeSlug(title)).toBe('this-is-a-test-title');
		expect(Meteor.utils.makeSlug(titleWithPunctuation)).toBe('heres-a-test-title-for-you');
	});

	it('checks a password string for requirements', function() {
		var tooShort = 'Try';
		var allUppercase = 'ALLCAPS';
		var allLowercase = 'nocaps';
		var valid = 'Valid 22'; // valid passwords must be >= 6 characters, have at least one upper/lowercase letter, and a number

		expect(Meteor.utils.validPassword(tooShort)).toBe(false);
		expect(Meteor.utils.validPassword(allUppercase)).toBe(false);
		expect(Meteor.utils.validPassword(allLowercase)).toBe(false);
		expect(Meteor.utils.validPassword(valid)).toBe(true);
	});

	it('converts a JS date string to human readable form', function() {
		var bday = new Date(1983, 04, 11);

		expect(Meteor.utils.prettifyDate(bday)).toEqual(['Wed.', '5/11/1983', '00:00']);
	});
});