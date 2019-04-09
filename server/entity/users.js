const dbContext = require("../dbcontext");
const Table = require("unloop-database-dynamo")(dbContext.db, dbContext.docClient);
const bcrypt = require("bcrypt");

const key = "username";

exports.key = key;

exports.schema =  {
    TableName : "User",
    BillingMode: "PROVISIONED",
    KeySchema: [
        { AttributeName: key, KeyType: "HASH"}
    ],
    AttributeDefinitions: [
            { AttributeName: key, AttributeType: "S" },
        ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

exports.initialData = () => hashPassword("changeme").then(
    hash => [
        {
            username: "admin@un-loop.org",
            name: "Unloop Administrator",
            password: hash,
            expiration: (new Date()).toISOString(),
            roles: ["super", "user"]
        }
    ]
);

const hashPassword = (password) =>
    new Promise(
        (resolve, reject) => {
            bcrypt.hash(password, Number(process.env.npm_package_config_saltRounds),
                (err, hash) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(hash);
                    }
                });
        }
    );

const validatePassword = (password) => (user) =>
    user ?  new Promise(
        (resolve, reject) =>
            bcrypt.compare(password, user.password, (err, res) => err ? reject(err) : resolve(res ? sanitizeUser(user) : res))
    ) :
    Promise.resolve(false);

exports.hashPassword = (user) => hashPassword(user.password).then(hash => {
    user.password = hash;
    return user;
});

exports.validatePassword = validatePassword;

const sanitizeUser = (user) => {
    delete user.password;
    return user;
};

exports.sanitizeUser = sanitizeUser;

exports.table = new Table(this);
