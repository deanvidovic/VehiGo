const { response } = require('express');
//const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    //console.log(err.message, err.code);
    let errors = {
        worker_username: '',
        worker_password: ''
    };

    if(err.message === 'Vasa lozinka ili korisnicko ime nije tocno!') {
        errors.worker_password = 'Vasa lozinka ili korisnicko ime nije tocno!';
    }

    return errors;
}

const maxAge = 1 * 24 * 60 * 60;
const createWorkerToken = (id) => {
    return jwt.sign({ id }, 'e alo bidibao radnik', { expiresIn: maxAge });
}

module.exports.admin_get = (req, res) => {
    res.render('../views/sites/admin', { });
}

module.exports.get_cars = (req, res) => {
    res.render('../views/panel/partials/cars');
}

module.exports.get_reservations = (req, res) => {
    res.render('../views/panel/partials/reservations');
}

module.exports.get_workers = (req, res) => {
    res.render('../views/panel/partials/workers');
}

module.exports.admin_post = async (req, res) => {
    const { admin_username, admin_password } = req.body;

    try {
        if (admin_username === "admin" && admin_password === "admin") {
            const token = createWorkerToken(admin_username);
            if (req.headers.cookie && (req.headers.cookie.includes('jwt') || req.headers.cookie.includes('id'))) {
                res.cookie('jwt', '', { maxAge:1 });
                res.cookie('id', '', { maxAge:1 });
                res.cookie('jwtw', token, { httpOnly: true, maxAge: maxAge * 1000 });  
                res.status(200).json({ admin: true });
            } else {
                res.cookie('jwtw', token, { httpOnly: true, maxAge: maxAge * 1000 }); 
                res.status(200).json({ admin: true });
            }
        } else {
            throw Error('Vasa lozinka ili korisnicko ime nije tocno!');
        }

    } catch (err) {
        const errors = handleErrors(err) 
        res.status(400).json({ errors })
    }

    //Customer.login(customer_email, customer_password);
}
