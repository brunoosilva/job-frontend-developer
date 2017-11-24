import angular from 'angular';

function scrollClass($window, $document) {
    return {
        restrict: 'A',
        link: (scope, element) => {
            angular.element($window).bind('scroll', () => {
                const st = $window.pageYOffset || $document[0].documentElement.scrollTop;

                if (st > scope.lastScrollTop) {
                    element.addClass('close');
                } else {
                    element.removeClass('close');
                }

                Object.assign(scope, {
                    lastScrollTop: st,
                });
            });
        },
    };
}

scrollClass.$inject = ['$window', '$document'];

export default angular.module('directives.scroll', [])
    .directive('scrollClass', scrollClass)
    .name;
