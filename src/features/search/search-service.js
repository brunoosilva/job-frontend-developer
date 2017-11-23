export default class SearchService {
    constructor() {
        this.videos = [
            {
                title: 'Teste',
            },
        ];
    }
    getVideos() {
        return Promise.resolve(this.videos);
    }
}
