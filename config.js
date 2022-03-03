const fs = require('fs');
const utf8 = { encoding: 'utf8' };

module.exports = {
  port: 3000,

  template: fs.readFileSync('./template.html', utf8),

  url2mockDefinition: {
    '/dynamic': fs.readFileSync('./mock/samples/dynamic.js', utf8),
    '/static': fs.readFileSync('./mock/samples/static.js', utf8),
    '/delay': fs.readFileSync('./mock/samples/delay.js', utf8),
    '/faker': fs.readFileSync('./mock/samples/faker.js', utf8),
    '/times': fs.readFileSync('./mock/samples/times.js', utf8),
    '/404': fs.readFileSync('./mock/samples/notfound.js', utf8),
    '/photos/1?bypass=1': fs.readFileSync('./mock/samples/bypass.js', utf8),
    '/photos/1?bypass=2': fs.readFileSync('./mock/samples/bypass.js', utf8),
    '/header': fs.readFileSync('./mock/samples/header.js', utf8),
    '/request-info?a=1': fs.readFileSync('./mock/samples/request.js', utf8),
  }
}
