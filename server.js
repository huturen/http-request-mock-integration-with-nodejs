require('./mock/.runtime.js');
const Koa = require('koa');
const axios = require('axios');
const app = new Koa();
const { port, tpl, url2mock, statics } = require('./config');

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
  if (isStatic(ctx)) return;
  if (isIndex(ctx)) return;

  const mockFile = url2mock[ctx.request.url];
  if (!mockFile) return (ctx.status = 404);

  const [spent, headers, result] = await request(ctx.request.url);

  ctx.body = tpl
    .replace('__mock_definitions__', mockFile)
    .replace('__request_result__', result)
    .replace('Spent: -', `Spent: ${spent}ms`)
    .replace('Response Headers: -', `Response Headers: ${headers}`);
});

app.listen(port);
console.log(`Listion at: http://localhost:${port}`);

function isIndex(ctx) {
  if (ctx.request.url === '/') {
    ctx.body = tpl
      .replace('__mock_definitions__', '')
      .replace('__request_result__', '');
    return true;
  }
  return false;
}


function isStatic(ctx) {
  if (statics[ctx.request.url]) {
    if (/\.css$/.test(ctx.request.url)) {
      ctx.set('Content-Type', 'text/css; charset=utf-8');
    } else if (/\.js/.test(ctx.request.url)) {
      ctx.set('Content-Type', 'text/javascript; charset=utf-8');
    }
    ctx.body = statics[ctx.request.url]
    return true;
  }
  return false;
}
