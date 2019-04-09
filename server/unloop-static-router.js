const static = require("koa-static")
const router = require("koa-router")
const checkPermission = require("./check-permission")

module.exports = (path, routes, loginPath) => (app) => {
    loginPath = loginPath ? loginPath : '/login';


    if (routes) {
        const authRouter = new router();

        for(let route of routes) {
            if (!route || !route.route) continue;

            authRouter.all(route.route, async (ctx, next) =>
            {
                if (!checkPermission(ctx, route.permissions)) {
                    ctx.redirect(`${loginPath}?redirect=${encodeURIComponent(ctx.url)}`);
                } else {
                    await next();
                }
            });
        }
        app.use(authRouter.middleware());
    }

    return static(path);
}
