import search from './index';

describe('Search', () => {
    let $controller;
    let ctrl;

    beforeEach(angular.mock.module(search));

    beforeEach(angular.mock.inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    it('check init values', () => {
        ctrl = $controller('SearchController');
        expect(ctrl.search).toBe(null);
        expect(ctrl.band).toBe(null);
        expect(ctrl.videos).toBe(null);
    });
});
