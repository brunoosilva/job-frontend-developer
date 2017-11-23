export default class SearchController {
    constructor(SearchService) {
        this.service = SearchService;
        this.videos = [];
    }

    getVideos() {
        return this.service.getVideos()
            .then((videos) => {
                this.videos = videos;
            });
    }
}

SearchController.$inject = ['SearchService'];
