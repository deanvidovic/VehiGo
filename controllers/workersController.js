const { response } = require('express');
//const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    //console.log(err.message, err.code);
    let errors = {
        worker_identification_number: '',
        worker_name: '',
        worker_last_name: '',
        worker_email: '',
        worker_phone_number: '',
        worker_address: '',
        worker_username: '',
        worker_password: ''
    };

    if(err.message === 'Vase korisnicko ime nije tocno!') {
        errors.worker_username = 'Vase korisnicko ime ne postoji!';
    }

    if(err.message === 'Vasa lozinka nije tocna!') {
        errors.worker_password = 'Vasa lozinka nije tocna!';
    }

    if (err.code == 11000) {
        errors.worker_email = 'Ovaj e-mail vec postoji.';
        errors.worker_identification_number = 'Ovaj OIB vec postoji.';
        return errors;
    }

    console.log(err.code)

    if (err.message.includes('workers validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
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
