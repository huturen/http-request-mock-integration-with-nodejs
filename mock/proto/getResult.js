/**
 * @url /getResult
 * @delay 10
 * @method any
 */
/* eslint-disable */
const faker = require('http-request-mock/plugin/faker.js');
module.exports = (request) => {
  return {
    code: 0,
    msg: "ok",
    data: {
      id: faker.incrementId(1, "Record"),
      name: faker.name(),
      age: faker.integer(0, 10000),
      email: faker.email(),
    },
  }
};