const Router = require('koa-router');

const route = new Router();


route.get('*', (ctx, next) => {
    console.log(ctx.req.url, '999');
    ctx.body = '<h2>33333</h2>';
    next();
})

module.exports = route;
