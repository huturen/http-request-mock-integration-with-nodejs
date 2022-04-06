/* global it, expect */

import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import HttpRequestMock from 'http-request-mock';
const mocker = HttpRequestMock.setupForUnitTest('node');

axios.defaults.adapter = httpAdapter;
it('use', async () => {
  mocker.use('../mock/samples/dynamic.js');
  const res = await axios.get('https://jsonplaceholder.typicode.com/dynamic');

  expect(res.data.msg).toBe('ok');
});
