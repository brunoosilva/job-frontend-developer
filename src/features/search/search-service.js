export default class SearchService {
    constructor($http, $q) {
        this.$http = $http;
        this.$q = $q;

        this.ticketMasterApi = 'https://app.ticketmaster.com/discovery/v2/attractions.json';
        this.ticketMasterKey = 'q2GNlCrgGo6c8uej3Ib4MsbAC2KIr5nG';

        this.youtubeApi = 'https://www.googleapis.com/youtube/v3/search';
        this.youtubeKey = 'AIzaSyDd_sfvQ4NASb-k0oKYAr_g9FZcQILtyKc';

        this.videos = [
            {
                title: 'Teste',
            },
        ];
    }
    getVideos(q) {
        return this.$http({
            url: this.youtubeApi,
            params: {
                part: 'snippet',
                key: this.youtubeKey,
                q,
                type: 'video',
                maxResults: '50',
            },
        }).then(res => res.data);
    }
    getAttractions(keyword) {
        return this.$http({
            url: this.ticketMasterApi,
            params: {
                keyword,
                apikey: this.ticketMasterKey,
            },
        }).then(res => res.data);
    }
    getBand(keyword) {
        return this.$q.all([
            this.getVideos(keyword),
            this.getAttractions(keyword),
        ]);
    }
}

SearchService.$inject = ['$http', '$q'];
