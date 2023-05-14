const Customer = require('../models/Customer')

const handleErrors = (err) => {
    let errors = {
        customer_driver_license_number: '',
        customer_first_name: '',
        customer_last_name: '',
        customer_home_address: '',
        customer_city: '',
        ccustomer_email: '',
        customer_password: ''
    };

    if (err.code == 11000) {
        errors.email = 'Ovaj e-mail vec postoji.'
        return errors;
    }

    if (err.message.includes('customer validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
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
        })

        res.status(201).json(customer)
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
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

module.exports.signin_post = async (req, res) => {
    res.send("new signin");
}