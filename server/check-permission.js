module.exports = (ctx, permissionSet) => {
    if (!permissionSet || permissionSet.length === 0) {
        return true;
    }

    if (!ctx.isAuthenticated()) {
        return false;
    }

    if (ctx.req.user.roles.includes("super")) {
        return true;
    }

    return  permissionSet.some( (perm) => typeof perm === "function" ?
                perm(ctx.req.user, ctx.request.body, ctx.params) :
                perm === "user" || (ctx.req.user.roles && ctx.req.user.roles.includes(perm)));
}
