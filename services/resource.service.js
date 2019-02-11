const ogs = require('open-graph-scraper');
const getVideoId = require('get-video-id');

module.exports.get = (url) => {
  return ogs({
    url: url,
    followAllRedirects: true, 
    maxRedirects: 5
  }).then(res => {
    const data = res.data;
    data.publisher = getVideoId(url).service;
    const info = {
      title: data.ogTitle,
      publisher: data.publisher || '',
      videos: (data.publisher) ? [url] : [],
      thumbnail: data.ogImage.url,
      url: url,
      description: data.ogDescription,
      tags: []
    }
    return Promise.resolve(info);
  })
}

// return axios.get(url)
//     .then(res => {
//       const htmlInfo = extractor(res.data);
//       const info = {
//         title: htmlInfo.title,
//         publisher: htmlInfo.publisher,
//         videos: (htmlInfo.publisher === 'YouTube') ? [url, ...htmlInfo.videos] : htmlInfo.videos,
//         thumbnail: htmlInfo.image,
//         url: url,
//         description: htmlInfo.description,
//         tags: htmlInfo.tags
//       }
//       return Promise.resolve(info);
//     });