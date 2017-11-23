import angular from 'angular';
import uiRouter from 'angular-ui-router';
import config from './config';

// Features
import search from './features/search';

// Style
import './assets/scss/iband.scss';

angular.module('iBand', [uiRouter, search])
    .config(config);
