const ResultCodes =require("../resultCodes");

module.exports = (entity) => {
    const users = entity.table;

    return {
        index: async function(ctx, next) {
            await next();

            const users = ctx.dbQuery ?
                await users.query(ctx.dbQuery.isOrdered ? ctx.dbQuery : ctx.dbQuery.order(true)) :
                await users.getAll();

            ctx.body = users.map(entity.sanitizeUser);
        },
        show: async function(ctx, next) {
            await next();

            if (!ctx.params.user) ctx.throw(ResultCodes.BadRequest, 'username required');
            var result = await users.get(ctx.params.user);

            if (!result) {
                ctx.status = ResultCodes.NotFound;
                ctx.body = 'Not Found';
            } else {
                ctx.body = entity.sanitizeUser(result);
            }
        },
        create: async function(ctx, next) {
            await next();
            if (!ctx.request.body || !ctx.request.body.username || !ctx.request.body.password) ctx.throw(ResultCodes.BadRequest, '.username, .password required');
            let user = (({ username, password }) => ({ username, password }))(ctx.request.body);

            await entity.hashPassword(user)
                .then(users.create)
                .then( (user) => {
                    ctx.status = ResultCodes.Created;
                    ctx.body = JSON.stringify(user);
                }, (err) => {
                    ctx.status = ResultCodes.Error;
                    ctx.body = "Failed to create user";
                });
        },
        update: async function(ctx, next) {
            await next();
            if (!ctx.params.user) ctx.throw(ResultCodes.BadRequest, 'username required');
            if (!ctx.request.body || !ctx.request.body.password) ctx.throw(ResultCodes.BadRequest, '.password required');

            let user = (({ password }) => ({ username: ctx.params.user, password }))(ctx.request.body);

            await entity.hashPassword(user)
                .then(users.update)
                .then( (user) => {
                    ctx.status = ResultCodes.Created;
                    ctx.body = JSON.stringify(user);
                }, (err) => {
                    ctx.status = ResultCodes.Error;
                    ctx.body = "Failed to create user";
                });
        },
        destroy: async function(next) {
            await next();
            if (!ctx.params.user) ctx.throw(ResultCodes.BadRequest, 'username required');

            await users.delete(ctx.params.user)
            .then(
                () => {
                    ctx.status = ResultCodes.Success;
                    ctx.body = "Deleted";
                }, (err) => {
                    ctx.status = ResultCodes.Error;
                    ctx.body = "Failed to delete user";
                }
            )
        }
    }
};

module.exports.permissions = {
    default: ["user"],
    index: ["admin"],
    show: ["admin"],
    create: ["admin"],
    update: ["admin", (user, body, params) => user.username === params.user],
    destroy: ["admin"]
}
