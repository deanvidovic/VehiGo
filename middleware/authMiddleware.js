const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // postoji li token i je li validan
    if (token) {
        jwt.verify(token, 'e alo bidibao', (err, decoded_token) => {
            if (err) {
                console.log(err);
                res.redirect('/signin');
            } else {
                console.log(decoded_token);
                next();
            }
        })
    } else {
        res.redirect('/signin');
    }
}

module.exports = { requireAuth }