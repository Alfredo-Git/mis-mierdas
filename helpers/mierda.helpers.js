module.exports = (hbs) => {
  hbs.registerHelper('get_video_stream', (mierda) => {
    console.info('Soy un hipsta => ', mierda)
    const defaultSrc = mierda.thumbnail || 'https://cdn-images-1.medium.com/max/1600/1*ezRyFFc7nnjq2fGSHCel3Q.jpeg'
    switch (mierda.publisher) {
      case 'youtube': return new hbs.SafeString(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${mierda.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
      case 'vimeo': return new hbs.SafeString(`<iframe class="vimeo" src="https://player.vimeo.com/video/${mierda.videoId}" width="640" height="360" frameborder="0"></iframe>`);
      default: return new hbs.SafeString(`<a href="${mierda.url}" target="_blank"><img src="${defaultSrc}" alt="${mierda.name}"></a>`);
    }
  });
}

