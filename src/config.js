export default function config($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}

config.$inject = ['$urlRouterProvider', '$locationProvider'];
