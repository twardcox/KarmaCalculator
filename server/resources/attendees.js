const ResultCodes = require("../resultCodes");
const { v4 } = require("uuid");

module.exports = (entity) => {
    const attendees = entity.table;

    return {
        index: async function(ctx, next) {
            await next();
            ctx.body = ctx.dbQuery ?
                await attendees.query(ctx.dbQuery.isOrdered ? ctx.dbQuery : ctx.dbQuery.order(false)) :
                await attendees.getAll();
        },
        show: async function(ctx, next) {
            await next();
            var result = await attendees.get(ctx.params.event, ctx.params.attendee);

            if (!result) {
                ctx.status = ResultCodes.NotFound;
                ctx.body = 'Not Found';
            } else {
                ctx.body = result;
            }
        },
        create: async function(ctx, next) {
            await next();
            if (!ctx.request.body || !ctx.params.event || !ctx.request.body.checkin || !ctx.request.body.name) ctx.throw(ResultCodes.BadRequest, 'eventId, .checkin, .name required');
            let attendee = (({ name, organization, email, phone, optIn, checkin }) => ({ name, organization, email, phone, optIn, checkin }))(ctx.request.body);
            attendee.eventId = ctx.params.event;
            attendee.attendeeId = v4();
            await attendees.create(attendee);
            ctx.status = ResultCodes.Created;
            ctx.body = JSON.stringify(attendee);
        },
        update: async function(ctx, next) {
            await next();
            if (!ctx.request.body || !ctx.params.event || !ctx.request.body.checkin || !ctx.request.body.name || !ctx.params.attendee) ctx.throw(ResultCodes.BadRequest, 'eventId, attendeeId, .checkin, .name required');
            if (!ctx.request.body || !ctx.request.body.eventId || !ctx.request.body.checkin) ctx.throw(ResultCodes.BadRequest, '.eventId, .checkin required');

            let attendee = (({ eventId, attendeeId, name, organization, email, phone, optIn, checkin } ) => ({ eventId, attendeeId, name, organization, email, phone, optIn, checkin }))(ctx.request.body);
            await attendees.update(attendee, ctx.params.event, ctx.params.attendee);
            ctx.status = ResultCodes.Success;
            ctx.body = JSON.stringify(attendee);
        },
        destroy: async function(ctx, next) {
            await next();
            if (!ctx.params.event || !ctx.params.attendee) ctx.throw(ResultCodes.BadRequest, 'eventId, attendeeId required');

            await attendees.delete(ctx.params.event, ctx.params.attendee);
            ctx.status = ResultCodes.Success;
            ctx.body = JSON.stringify(attendee);
        }
    }
}

module.exports.permissions = {
    default: ["user"],
    index: ["admin"],
    show: ["admin"],
    create: [],
    update: ["admin"],
    destroy: ["admin"]
}
