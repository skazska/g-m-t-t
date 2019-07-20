import Router from 'koa-router';
import PBRCrud from '../models/phone-book-record';
import convert from 'koa-convert';
import KoaBody from 'koa-body';

const
    router = new Router(),
    koaBody = convert(KoaBody());

// koa middleware adds phone-book-record model storage to state
const storage = (ctx, next) => {
    ctx.state.pbrModel = new PBRCrud(ctx.state.user);
    next();
};

router
    .get('/', storage, async (ctx, next) => {
        ctx.body = await ctx.state.pbrModel.list();
    })
    .get('/:name', storage, async (ctx, next) => {

        let result = await ctx.state.pbrModel.get(ctx.params.name);
        if (result) {
            ctx.body = result
        } else {
            ctx.status = 204
        }
    })
    .post('/', koaBody, storage, async (ctx, next) => {
        ctx.status = 201;
        ctx.body = await ctx.state.pbrModel.create(ctx.request.body)
    })
    .put('/:name', koaBody, storage, async (ctx, next) => {
        ctx.status = 204;
        await ctx.state.pbrModel.update(ctx.params.name, ctx.request.body);
    })
    .delete('/:name', storage, async (ctx, next) => {
        ctx.status = 204;
        await ctx.state.pbrModel.delete(ctx.params.name);
    });

export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }
