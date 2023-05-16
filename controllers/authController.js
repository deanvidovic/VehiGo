const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        license_number: '',
        first_name: '',
        last_name: '',
        home_address: '',
        city: '',
        email: '',
        password: ''
    };


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
const createToken = (id) => {
    return jwt.sign({ id }, 'e alo bidibao', { expiresIn: maxAge });
}

module.exports.signup_get = (req, res) => {
    res.render('../views/sites/signup');
}

module.exports.signin_get = (req, res) => {
    res.render('../views/sites/signin');
}

module.exports.signup_post = async (req, res) => {
    // funkcija je asinkrona zbog toga sto treba await da ne bi bio promise u customeru
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

        const token = createToken(customer._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json( { customer: customer._id} );

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}

module.exports.signin_post = async (req, res) => {
    res.send("new signin");
}


// {
//     "customer_driver_license_number": 300004,
//     "customer_first_name":"Dean",
//     "customer_last_name":"Vidovic",
//     "customer_home_address":"Antuna Nemcica 12",
//     "customer_city":"Samobor",
//     "ccustomer_email":"deaan@gmail.com",
//     "customer_password":"lozinka"
// }