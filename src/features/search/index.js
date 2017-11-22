(() => {
	'use strict';

	angular.module('iBand')
		.config(($stateProvider) => {
			$stateProvider.state('search', {
				url: '/',
				templateUrl: '/features/search/search-template.html',
				controller: 'SearchController as vm',
			});
		});
})();
