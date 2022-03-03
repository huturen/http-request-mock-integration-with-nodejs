/**
 * @url https://jsonplaceholder.typicode.com/faker
 * @delay 10
 * @method any
 */
const faker = require('http-request-mock/plugin/faker.js');
module.exports = () => {
  return {
    id: faker.incrementId(1, 'faker'),
    name: faker.name(),
    age: 10 + faker.rand(0, 90),
    phone: faker.phone('(###) ###-####'),
    gender: faker.chance.gender(),
    url: faker.url(),
    avatar: faker.avatar(),
    guid: faker.guid(),
  };
};
