describe('Home page grid controller', function() {
	beforeEach(module('meteorite'));

	// Get a new controller before each test is executed
	var $controller = {}, cards = {}, $scope = {};
	beforeEach(inject(function (_$controller_) {
		$controller = _$controller_;
	}));

	// mock collection functions
	beforeEach(function () {
		// spyOn(cards, 'getCollection').and.returnValue(expected);
		$controller('meteorite_default', {
			$scope: $scope
		});
	});

	it('should be loaded', function() {
		// $scope.cards = tomato;

		expect($scope.test).toBe('hey there');
	});
});