require('./mock/.runtime.js');
const Koa = require('koa');
const axios = require('axios');
const app = new Koa();
const { port, template: tpl, url2mockDefinition } = require('./config');

const request = async (url) => {
  const now = Date.now();
  let result = '';
  let headers = '';
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com' + url);
    result = JSON.stringify(res.data, null, 2);
    headers = JSON.stringify(res.headers, null, 2);
  } catch(err) {
    result = err.message;
    headers = '-';
  }
  const spent = Date.now() - now;
  return [spent, headers, result];
};

app.use(async ctx => {
  const urls = Object.keys(url2mockDefinition);
  let body = tpl;

  const links = urls.map(url => `<a href="${url}">${url}</a>`);
  body = body.replace('__all_links__', links.join('\n'));

  if (ctx.request.path === '/') {
    body = body.replace('__mock_definitions__', '');
    body = body.replace('__request_result__', '');
    return (ctx.body = body);
  }

  const key = urls.find(url => ctx.request.url === url);
  if (!key) {
    ctx.body = 'Not Found.';
    return (ctx.status = 404);
  }

  const [spent, headers, result] = await request(ctx.request.url);
  body = body.replace('__mock_definitions__', url2mockDefinition[key]);
  body = body.replace('__request_result__', result);
  body = body.replace('Spent: -', `Spent: ${spent}ms`);
  body = body.replace('Response Headers: -', `Response Headers: ${headers}`);
  ctx.body = body
});

app.listen(port);
console.log(`Listion at: http://localhost:${port}`);
