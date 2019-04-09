const passport = require('koa-passport');
const route = require('koa-route');
const session = require('./session');
const cryptKey = process.env.npm_config_cryptKey;
const crypt = require('./crypt')(cryptKey);
const context = require('./user-context');

const userEntity = require("./entity/users");

passport.serializeUser(function(user, done) {
    try {
        const data = crypt.encrypt(JSON.stringify(user));
        const buffer = new Buffer(JSON.stringify(data));

        done(null, buffer.toString('base64'));
    } catch(err) {
        done(err);
    }
});

passport.deserializeUser(async function(data, done) {
    try {
        const buffer = new Buffer(data, 'base64');
        const dataObj = JSON.parse(buffer.toString('utf8'));
        const decryptedData = crypt.decrypt(dataObj);
        const user = JSON.parse(decryptedData);
        done(null, user);
    } catch(err) {
      done(err);
    }
});

//todo: implement a jwt strategy. See https://medium.com/@rob.s.ellis/koa-api-secured-with-passport-jwt-2fd2d32771bd,
// https://www.npmjs.com/package/jsonwebtoken
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done) {
    userEntity.table.get(username)
        .then(userEntity.validatePassword(password))
        .then((result) =>
            {
                return done(null, result);
            })
        .catch(done)
}));

const authenticateMiddleware = (ctx, next) => {
    const successRedirect = ctx.request.body.redirect || '/';
    const failureRedirect = `/login?message=${encodeURI("invalid username or password")}`;

    return passport.authenticate('local', { successRedirect, failureRedirect })(ctx, next);
}

module.exports = (app) => {
    app.use(session(app, cryptKey));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(context());

    app.use(route.post('/login', authenticateMiddleware));

    app.use(route.get('/logout', function(ctx) {
        if (ctx.isAuthenticated()) {
            ctx.logout();
            ctx.redirect('/login');
          } else {
            ctx.body = "Not Authorized";
            ctx.throw(401);
          }
      }))

    return async (ctx, next) => {
        await next();
    }
}
