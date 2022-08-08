const Koa = require('koa');
const routerConfig = require('./routerConfig');

const server = new Koa();

server.use(routerConfig.routes());

const port = 5090;
server.listen(port, () => {
    process.stdout.write(`server listen: http://localhost:${port}\n`)
})