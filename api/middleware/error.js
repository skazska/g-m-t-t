const statusFromMessage = message => {
    switch (message) {
        case 'not found':
            return 404;
        case 'record exists':
            return 400;
    }
};

module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || statusFromMessage(err.message) || 500;
        ctx.body = {
            message: err.message
        };
    }
};
