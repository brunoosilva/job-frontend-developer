export default class SearchController {
    constructor(SearchService) {
        this.service = SearchService;
        this.search = '';
        this.band =  SearchController._convertBandInfo({"name":"Coldplay","type":"attraction","id":"K8vZ9171izV","test":false,"url":"http://www.ticketmaster.com/artist/806431","locale":"en-us","externalLinks":{"youtube":[{"url":"https://www.youtube.com/user/ColdplayTV"},{"url":"https://www.youtube.com/user/ColdplayVEVO"}],"twitter":[{"url":"https://twitter.com/coldplay"}],"itunes":[{"url":"https://itunes.apple.com/artist/id471744"}],"lastfm":[{"url":"http://www.last.fm/music/Coldplay"}],"facebook":[{"url":"https://www.facebook.com/coldplay"}],"wiki":[{"url":"https://en.wikipedia.org/wiki/Coldplay"}],"instagram":[{"url":"https://instagram.com/coldplay/"}],"musicbrainz":[{"id":"cc197bad-dc9c-440d-a5b5-d52ba2e14234"}],"homepage":[{"url":"http://www.coldplay.com/"}],"vevo":[{"url":"http://www.vevo.com/artist/coldplay"}]},"images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/a/77f/91f393e5-9452-4b4b-a002-f0867d4e377f_445871_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/a/77f/91f393e5-9452-4b4b-a002-f0867d4e377f_445871_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/a/77f/91f393e5-9452-4b4b-a002-f0867d4e377f_445871_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/a/77f/91f393e5-9452-4b4b-a002-f0867d4e377f_445871_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":false},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/a/77f/91f393e5-9452-4b4b-a002-f0867d4e377f_445871_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/a/77f/91f393e5-9452-4b4b-a002-f0867d4e377f_445871_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":false},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/a/77f/91f393e5-9452-4b4b-a002-f0867d4e377f_445871_CUSTOM.jpg","width":305,"height":225,"fallback":false},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/a/77f/91f393e5-9452-4b4b-a002-f0867d4e377f_445871_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":false},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/a/77f/91f393e5-9452-4b4b-a002-f0867d4e377f_445871_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/a/77f/91f393e5-9452-4b4b-a002-f0867d4e377f_445871_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":false}],"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nJ","name":"Music"},"genre":{"id":"KnvZfZ7vAeA","name":"Rock"},"subGenre":{"id":"KZazBEonSMnZfZ7v6dt","name":"Alternative Rock"},"type":{"id":"KZAyXgnZfZ7v7l1","name":"Group"},"subType":{"id":"KZFzBErXgnZfZ7vA71","name":"Band"}}],"upcomingEvents":{"_total":6,"tmr":5,"ticketmaster":1},"_links":{"self":{"href":"/discovery/v2/attractions/K8vZ9171izV?locale=en-us"}}}); //eslint-disable-line
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

    static _convertBandInfo(attraction) {
        const {
            name, images, externalLinks, classifications,
        } = attraction;

        const cover = images.find(image => image.width === 2048 || image.width === 1024);
        const genre = classifications.find(classification => classification.primary).genre.name;
        const socialsAccepted = ['facebook', 'twitter', 'youtube', 'instagram', 'lastfm'];
        const socials = Object.keys(externalLinks)
            .map(key => ({ icon: key, url: externalLinks[key][0].url }))
            .filter(social => socialsAccepted.includes(social.icon));

        return {
            name,
            cover: cover.url,
            genre,
            socials,
        };
    }
}

SearchController.$inject = ['SearchService'];
