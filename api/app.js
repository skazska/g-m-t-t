const path = require('path');
const Koa = require('koa');
const cors = require('koa-cors');
// const serve = require('koa-static');

const convert = require('koa-convert');

const err = require('./middleware/error');
const app = new Koa();
const {routes, allowedMethods} = require('./middleware/routes');

app.use(convert(cors({origin: '*'})));

app.use(err);

// TODO implement authentication
// https://github.com/koajs/jwt
// var jwt = require('koa-jwt');
// // Custom 401 handling if you don't want to expose koa-jwt errors to users
// app.use(function(ctx, next){
//     return next().catch((err) => {
//         if (401 == err.status) {
//             ctx.status = 401;
//             ctx.body = 'Protected resource, use Authorization header to get access\n';
//         } else {
//             throw err;
//         }
//     });
// });
//
// // Unprotected middleware
// app.use(function(ctx, next){
//     if (ctx.url.match(/^\/public/)) {
//         ctx.body = 'unprotected\n';
//     } else {
//         return next();
//     }
// });
//
// // Middleware below this line is only reached if JWT token is valid
// app.use(jwt({ secret: 'shared-secret' }));
app.use(async (ctx, next) => {
    ctx.state.user = 'shared';
    await next();
});

app.use(routes());
// app.use(allowedMethods());

// serve files from ./public
// app.use(serve(path.join(__dirname, '../front/dist/front')));


module.exports = app;
