const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer')

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


const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'e alo bidibao', async (err, decoded_token) => {
            if (err) {
                console.log(err);
                res.locals.customer = null;
                next();
            } else {
                console.log(decoded_token);
                let customer = await Customer.findById(decoded_token.id);
                res.locals.customer = customer;
                next();
            } 
        })
    } else {
        res.locals.customer = null;
        next();
    }
}


module.exports = { requireAuth, checkUser }