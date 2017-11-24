import angular from 'angular';
import uiRouter from 'angular-ui-router';
import config from './config';

// Features
import search from './features/search';

// Directives
import scroll from './directives/scroll/scroll-directive';
import video from './directives/youtube/youtube-directive';

// Style
import './assets/scss/iband.scss';

angular.module('iBand', [uiRouter, search, scroll, video])
    .config(config);
