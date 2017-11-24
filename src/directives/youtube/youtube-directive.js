import angular from 'angular';
import template from './youtube-template.html';

function youtube($sce) {
    return {
        restrict: 'E',
        // replace: true,
        templateUrl: template,
        scope: {
            id: '=?',
            onClose: '&?',
        },
        link: (scope) => {
            Object.assign(scope, {
                videoUrl: $sce.trustAsResourceUrl(`https://www.youtube.com/embed/${scope.id}?autoplay=1`),
                close: () => {
                    scope.onClose(); //eslint-disable-line
                },
            });
        },
    };
}

youtube.$inject = ['$sce'];

export default angular.module('directives.youtube', [])
    .directive('youtube', youtube)
    .name;
