/**
 * @url https://jsonplaceholder.typicode.com/times
 * @header content-type: application/json
 * @method any
 * @times 10
 */
const faker = require('http-request-mock/plugin/faker.js');
let times = 10;
module.exports = () => ({
  id: faker.incrementId(),
  name: faker.name(),
  address: faker.address(),
  current: times,
  msg: `This mock item will be disabled after ${--times} requests.`,
})
