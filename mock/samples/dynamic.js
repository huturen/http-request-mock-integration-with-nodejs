/**
 * @url https://jsonplaceholder.typicode.com/dynamic
 * @header content-type: application/json
 * @proxy
 * @method get
 */
const faker = require('http-request-mock/plugin/faker.js');
module.exports = (request) => {
  return  {
    ret: 0,
    msg: 'ok',

    name: faker.name(),
    email: faker.email(),
    phone: faker.phone('1-###-###-####'),
    url: request.url,
  };
}

