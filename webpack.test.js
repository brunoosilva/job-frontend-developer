import 'angular';
import 'angular-mocks/angular-mocks';

const testsContext = require.context('./src', true, /.test$/);
testsContext.keys().forEach(testsContext);
