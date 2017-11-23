export default class SearchController {
    constructor(SearchService) {
        this.service = SearchService;
        this.search = '';
        this.band = {};
        this.videos = [];
        this.events = [];
    }

    getBand() {
        return Promise.all([
            this.service.getVideos(this.search),
            this.service.getAttractions(this.search),
        ]).then((res) => {
            const [videos, attractions] = res;
            const [band] = attractions._embedded.attractions;

            this.videos = videos.items;
            this.band = band;
        });
    }
}

SearchController.$inject = ['SearchService'];
