const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/authenticate",
    "/users",
    "/users/?userId/trainings",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:3000',
        secure: false
    });

    app.use(appProxy);
};
