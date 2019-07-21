/**
 * Module provides phone book routes configuration
 * phone book routes expect ctx.state.pbrModel to be instance of phone-book-record
 */

const fs = require('fs');
const Router = require('koa-router');
const convert = require('koa-convert');
const KoaBody = require('koa-body');

const koaBody = convert(KoaBody());
const koaBodyMultipart = convert(KoaBody({ multipart: true }));
const router = new Router();

// TODO implement route controllers, and backend-frontend models and data validation

router
    .get('phone-list', '/', async (ctx) => {
        ctx.body = await ctx.state.pbrModel.list();
    })
    .get('phone-record', '/:name', async (ctx) => {

        let result = await ctx.state.pbrModel.get(ctx.params.name);
        if (result) {
            ctx.body = result;
        } else {
            ctx.status = 204;
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
    .delete('del-phone-record', '/:name', async (ctx) => {
        ctx.status = 204;
        await ctx.state.pbrModel.delete(ctx.params.name);
    })
    .post('upload-file', '/file', koaBodyMultipart, async (ctx) => {
        // process uploaded file
        const file = ctx.request.files.file;

        // read from tmp
        let data = await new Promise((resolve, reject) => {
            fs.readFile(file.path, 'utf8', (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });

        // parse json
        try {
            data = JSON.parse(data);
        } catch (e) {
            throw new Error('bad request');
        }

        // merge with list from storage
        await ctx.state.pbrModel.bulkUpdate(data);

        ctx.status = 204;
    });


module.exports = {
    routes: () => {
        return router.routes();
    },
    allowedMethods: () => {
        return router.allowedMethods()
    }
};
