const { response } = require('express');
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    //console.log(err.message, err.code);
    let errors = {
        license_number: '',
        first_name: '',
        last_name: '',
        home_address: '',
        city: '',
        email: '',
        password: ''
    };

    if(err.message === 'Vas e - mail nije tocan!') {
        errors.email = 'Vas e - mail ne postoji!';
    }

    if(err.message === 'Vasa lozinka nije tocna!') {
        errors.password = 'Vasa lozinka nije tocna!';
    }

    if (err.code == 11000) {
        errors.email = 'Ovaj e-mail vec postoji.';
        errors.license_number = 'Ovaj broj vozacke dozvole vec postoji.';
        return errors;
    }

    console.log(err.code)

    if (err.message.includes('customer validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createUserToken = (id) => {
    return jwt.sign({ id }, 'e alo bidibao', { expiresIn: maxAge });
}

module.exports.signup_get = (req, res) => {
    res.render('../views/sites/signup', { });
}

module.exports.signin_get = (req, res) => {
    res.render('../views/sites/signin', { });
}



module.exports.signup_post = async (req, res) => {
    const {
        customer_driver_license_number,
        customer_first_name,
        customer_last_name,
        customer_home_address,
        customer_city,
        customer_email,
        customer_password
    } = req.body;

    try {
        const customer = await Customer.create({
            customer_driver_license_number,
            customer_first_name,
            customer_last_name,
            customer_home_address,
            customer_city,
            customer_email,
            customer_password
        });

        const token = createUserToken(customer._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json( { customer: customer._id} );

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}

module.exports.signin_post = async (req, res) => {
    const { customer_email, customer_password } = req.body;

    try {
        const customer = await Customer.login(customer_email, customer_password);
        const token = createUserToken(customer._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); 

        res.status(200).json({ customer: customer._id })
    } catch (err) {
        const errors = handleErrors(err) 
        res.status(400).json({ errors })
    }

    //Customer.login(customer_email, customer_password);
}




module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge:1 });
    res.cookie('id', '', { maxAge:1 });
    res.redirect('/');
}
