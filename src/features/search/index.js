import angular from 'angular';
import uiRouter from 'angular-ui-router';
import config from './search-config';
import SearchController from './search-controller';
import SearchService from './search-service';

export default angular.module('iBand.search', [uiRouter])
    .config(config)
    .controller('SearchController', SearchController)
    .service('SearchService', SearchService)
    .name;
