module.exports = (hbs) => {
    hbs.registerHelper('get_video_stream', (mierda) => {
        switch (mierda.publisher) {
            case 'youtube': return new hbs.SafeString(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${mierda.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
            case 'vimeo': return new hbs.SafeString(`<iframe src="https://player.vimeo.com/video/${mierda.videoId}" width="640" height="360" frameborder="0"></iframe>`);
            default: return undefined;
        }
    });
}

