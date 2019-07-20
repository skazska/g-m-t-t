const Router = require('koa-router');
const pbrRouter = require('./routes/phone-book');

const Store = require('../storage/memory');

const PBRCrud = require('../models/phone-book-record');

// koa middleware adds phone-book-record model storage to state
const pbrStorage = async (ctx, next) => {
    const storage = await Store.get({user: ctx.state.user});
    ctx.state.pbrModel = new PBRCrud(storage);
    await next();
};


const api = new Router();
api.use('/phone-book', pbrStorage);
api.use('/phone-book', pbrRouter.routes(), pbrRouter.allowedMethods());

module.exports = {
    routes: () => {
        return api.routes();
    },
    allowedMethods: () => {
        return api.allowedMethods()
    }
};
