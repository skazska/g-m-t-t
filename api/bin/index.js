const config = require('config');
const app = require('../app');

app.listen(config.server.port, function () {
    console.log('%s listening at port %d', config.server.name, config.server.port);
});
