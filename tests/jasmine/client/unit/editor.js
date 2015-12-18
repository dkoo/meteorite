describe('editor', function() {
	beforeEach(function() {

	});

	it('should be able to parse some markdown using marked()', function() {
		// parse a string
		var parsed = marked('some markdown text');

		expect(parsed.trim()).toBe('<p>some markdown text</p>');
	});
});