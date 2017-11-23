const config = ($urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
};

config.$inject = ['$urlRouterProvider', '$locationProvider'];

export default config;
