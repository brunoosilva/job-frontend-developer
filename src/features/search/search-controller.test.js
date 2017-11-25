import 'babel-polyfill';
import search from './index';

describe('Search', () => {
    let $controller;
    let vm;

    beforeEach(angular.mock.module(search));

    beforeEach(angular.mock.inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    beforeEach(() => {
        vm = $controller('SearchController');
    });

    it('check init values', () => {
        expect(vm.search).toBe(null);
        expect(vm.band).toBe(null);
        expect(vm.videos).toBe(null);
    });

    describe('convertVideosInfo', () => {
        it('convert to video info', () => {
            const videos = [
                {
                    id: {
                        videoId: 123
                    },
                    snippet: {
                        thumbnails: {
                            high: {
                                url: 'http'
                            }
                        },
                        channelId: 456,
                        channelTitle: 'Channel',
                        title: 'Title',
                        description: 'Desc',
                        publishedAt: '2017-10-01'
                    }
                }
            ];

            expect(vm.convertVideosInfo(videos)).toEqual([
                {
                    id: 123,
                    image: 'http',
                    channel: {
                        id: 456,
                        name: 'Channel',
                    },
                    title: 'Title',
                    description: 'Desc',
                    published: '2017-10-01'
                }
            ]);
        });
    });

    describe('convertBandInfo', () => {
        let attraction;

        beforeAll(() => {
            attraction = {
                name: 'Test',
                images: [
                    {
                        width: 2048,
                        url: 'http'
                    },
                    {
                        width: 1024,
                        url: 'http2'
                    }
                ],
                externalLinks: {
                    facebook: [
                        {
                            url: 'http://facebook'
                        }
                    ],
                    linkedIn: [
                        {
                            url: 'http://linkedIn'
                        }
                    ]
                },
                classifications: [
                    {
                        primary: true,
                        genre: {
                            name: 'Rock'
                        }
                    },
                    {
                        genre: {
                            name: 'Electronic'
                        }
                    }
                ]
            };
        });

        it('convert to band info full', () => {
            expect(vm.convertBandInfo(attraction)).toEqual({
                name: 'Test',
                cover: 'http',
                genre: 'Rock',
                socials: [
                    {
                        icon: 'facebook',
                        url: 'http://facebook'
                    }
                ]
            });
        });

        it('get image 1024', () => {
            Object.assign(attraction, {
                images: attraction.images.filter(image => image.width === 1024)
            });

            expect(vm.convertBandInfo(attraction)).toEqual({
                name: 'Test',
                cover: 'http2',
                genre: 'Rock',
                socials: [
                    {
                        icon: 'facebook',
                        url: 'http://facebook'
                    }
                ]
            });
        });

        it('without socials accepted', () => {
            delete attraction.externalLinks.facebook;

            expect(vm.convertBandInfo(attraction)).toEqual({
                name: 'Test',
                cover: 'http2',
                genre: 'Rock',
                socials: []
            });
        });

        it('socials empty', () => {
            delete attraction.externalLinks;

            expect(vm.convertBandInfo(attraction)).toEqual({
                name: 'Test',
                cover: 'http2',
                genre: 'Rock',
                socials: []
            });
        });


    });
});
