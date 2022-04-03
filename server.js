require('./mock/.runtime.js');
const Koa = require('koa');
const axios = require('axios');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const { port, tpl, url2mock, statics } = require('./config');

const request = async (url) => {
  const now = Date.now();
  let result = '';
  let headers = '';
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com' + url, {
      proxy: false,
    });
    result = JSON.stringify(res.data, null, 2);
    headers = JSON.stringify(res.headers, null, 2);
  } catch(err) {
    console.log('axios.get err:', err.stack)
    result = err.message;
    headers = '-';
  }
  const spent = Date.now() - now;
  return [spent, headers, result];
};

// Set up your controllers
router.get('/', ctx => render(ctx, {}));

router.get('/default.min.css', ctx => {
  ctx.set('Content-Type', 'text/css; charset=utf-8');
  ctx.body = statics['/default.min.css'];
});

router.get('/highlight.min.js', ctx => {
  ctx.set('Content-Type', 'text/javascript; charset=utf-8');
  ctx.body = statics['/highlight.min.js'];
});

for(const [url, mockData] of Object.entries(url2mock)) {
  router.get(url, async ctx => {
    const [spent, headers, result] = await request(ctx.request.url);

    render(ctx, { mockData, result, spent, headers });
  });
}

app.use(router.routes()).use(router.allowedMethods());
app.listen(port);
console.log(`Listion at: http://localhost:${port}`);


function render(ctx, data = {}) {
  ctx.body = tpl
    .replace('__mock_definitions__', data.mockData || '')
    .replace('__request_result__', data.result || '')
    .replace('Spent: -', `Spent: ${data.spent || ''}`)
    .replace('Response Headers: -', `Response Headers: ${data.headers || ''}`);
}
