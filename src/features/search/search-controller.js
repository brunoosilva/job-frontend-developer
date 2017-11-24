export default class SearchController {
    constructor(SearchService, $timeout) {
        this.service = SearchService;
        this.$timeout = $timeout;
        this.showResult = false;
        this.loading = false;
        this.search = null;
        this.band = null;
        this.videos = null;
    }

    getBand() {
        this.loading = true;
        this.showResult = false;
        this.band = null;
        this.videos = null;

        return this.service.getBand(this.search).then((res) => {
            const [videos, attractions] = res;

            if (videos && videos.items.length) {
                this.videos = SearchController.convertVideosInfo(videos.items);
            }

            if (attractions && attractions._embedded) {
                const [band] = attractions._embedded.attractions;
                this.band = SearchController.convertBandInfo(band);
            }

            this.$timeout(() => {
                this.loading = false;
                this.showResult = true;
            }, 1000);
        });
    }

    static convertBandInfo(attraction) {
        const {
            name, images, externalLinks, classifications,
        } = attraction;

        const cover = images.find(image => image.width === 2048 || image.width === 1024);
        const genre = classifications.find(classification => classification.primary).genre.name;
        const socialsAccepted = ['facebook', 'twitter', 'youtube', 'instagram', 'lastfm'];
        const socials = !externalLinks ? [] : Object.keys(externalLinks)
            .map(key => ({ icon: key, url: externalLinks[key][0].url }))
            .filter(social => socialsAccepted.includes(social.icon));

        return {
            name,
            cover: cover.url,
            genre,
            socials,
        };
    }

    static convertVideosInfo(videos) {
        return videos.map(video => ({
            id: video.id.videoId,
            image: video.snippet.thumbnails.high.url,
            channel: {
                id: video.snippet.channelId,
                name: video.snippet.channelTitle,
            },
            title: video.snippet.title,
            description: video.snippet.description,
            published: video.snippet.publishedAt,
        }));
    }
}

SearchController.$inject = ['SearchService', '$timeout'];
