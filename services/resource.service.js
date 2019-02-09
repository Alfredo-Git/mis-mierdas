const axios = require('axios');
const extractor = require('unfluff');

module.exports.get = (link) => {
  return axios.get(link)
    .then(res => {
      const htmlInfo = extractor(res.data);
      const linkInfo = {
        title: htmlInfo.title || '',
        publisher: htmlInfo.publisher
      }

      if (htmlInfo.publisher === 'Youtube') {
        htmlInfo.videos.push(link);
      }
    });
}