const dbContext = require("../dbcontext");
const Table = require("unloop-database-dynamo")(dbContext.db, dbContext.docClient);

const key = "eventId";
const rangeKey = "attendeeId";

exports.key = key;
exports.rangeKey = rangeKey;

exports.schema =  {
    TableName : "Attendee",
    BillingMode: "PROVISIONED",
    KeySchema: [
        { AttributeName: key, KeyType: "HASH"},
        { AttributeName: rangeKey, KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
            { AttributeName: key, AttributeType: "S" },
            { AttributeName: rangeKey, AttributeType: "S" }
        ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

exports.table = new Table(this);
