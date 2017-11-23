import template from './search-template.html';

const config = ($stateProvider) => {
    $stateProvider.state('search', {
        url: '/',
        templateUrl: template,
        controller: 'SearchController as vm',
    });
};

config.$inject = ['$stateProvider'];

export default config;
