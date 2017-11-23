import template from './search-template.html';

export default function config($stateProvider) {
    $stateProvider.state('search', {
        url: '/',
        templateUrl: template,
        controller: 'SearchController as vm',
    });
}

config.$inject = ['$stateProvider'];
