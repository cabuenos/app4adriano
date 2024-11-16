const session = require('express-session');
const { createHash } = require('crypto');

const now = Date.now().toString();

hash = createHash('sha256').update(now).digest('hex');
console.log('ay caramba.....')
module.exports = session({
    secret: hash,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 3600000
    }
});