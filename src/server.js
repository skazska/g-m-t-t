import Koa from 'koa';
import config from 'config';
import err from './middleware/error';
import {routes, allowedMethods} from './middleware/routes';

const app = new Koa();

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


// TODO instead of authentication
app.use((ctx, next) => {
    ctx.state.user = 'shared';
    next();
});

app.use(err);
app.use(routes());
app.use(allowedMethods());

app.listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});
