/**
 * Module provides phone book routes configuration
 * phone book routes expect ctx.state.pbrModel to be instance of phone-book-record
 */

const Router = require('koa-router');
const convert = require('koa-convert');
const KoaBody = require('koa-body');

const koaBody = convert(KoaBody());
const router = new Router();

router
    .get('phone-list', '/', async (ctx) => {
        ctx.body = await ctx.state.pbrModel.list();
    })
    .get('phone-record', '/:name', async (ctx) => {

        let result = await ctx.state.pbrModel.get(ctx.params.name);
        if (result) {
            ctx.body = result
        } else {
            ctx.status = 204
        }
    })
    .post('new-phone-record', '/', koaBody, async (ctx) => {
        ctx.status = 201;
        ctx.body = await ctx.state.pbrModel.create(ctx.request.body)
    })
    .put('edit-phone-record', '/:name', koaBody, async (ctx) => {
        ctx.status = 200;
        ctx.body = await ctx.state.pbrModel.update(ctx.params.name, ctx.request.body);
    })
    .delete('del_phone-record', '/:name', async (ctx) => {
        ctx.status = 204;
        await ctx.state.pbrModel.delete(ctx.params.name);
    });

module.exports = {
    routes: () => {
        return router.routes();
    },
    allowedMethods: () => {
        return router.allowedMethods()
    }
};
