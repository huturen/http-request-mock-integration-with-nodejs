const fs = require('fs');
const utf8 = { encoding: 'utf8' };

module.exports = {
  port: 3000,

  tpl: fs.readFileSync('./tpl.html', utf8),

  url2mock: {
    '/dynamic': fs.readFileSync('./mock/samples/dynamic.js', utf8),
    '/static': fs.readFileSync('./mock/samples/static.js', utf8),
    '/delay': fs.readFileSync('./mock/samples/delay.js', utf8),
    '/faker': fs.readFileSync('./mock/samples/faker.js', utf8),
    '/times': fs.readFileSync('./mock/samples/times.js', utf8),
    '/404': fs.readFileSync('./mock/samples/notfound.js', utf8),
    '/photos/1': fs.readFileSync('./mock/samples/bypass.js', utf8),
    '/header': fs.readFileSync('./mock/samples/header.js', utf8),
    '/request-info': fs.readFileSync('./mock/samples/request.js', utf8),
    '/remote': fs.readFileSync('./mock/samples/remote.js', utf8),
  },

  statics: {
    '/default.min.css': fs.readFileSync('./highlight/default.min.css', utf8),
    '/highlight.min.js': fs.readFileSync('./highlight/highlight.min.js', utf8),
  }
}
