/* global it, expect */
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import HttpRequestMock from 'http-request-mock';

axios.defaults.adapter = httpAdapter;
const mocker = HttpRequestMock.setupForUnitTest('node');

mocker.get('https://your.api.com/path', function() {
  return { abc: 123 };
});

it('should match object`', async () => {
  const res = await axios.get('https://your.api.com/path');
  expect(res.data).toMatchObject({abc: 123});
});
