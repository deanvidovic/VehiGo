const mongoose = require('mongoose');
const { isEmail } = require('validator');



const customersSchema = new mongoose.Schema({
    customer_driver_license_number: {
        type: Number,
        required: [true, 'Morate unijeti broj vozacke dozvole!']
    },

    customer_first_name: {
        type: String,
        required: [true, 'Morate unijeti vase ime!']
    },

    customer_last_name: {
        type: String,
        required: [true, 'Morate unijeti vase prezime!']
    },

    customer_home_address: {
        type: String,
        required: [true, 'Morate unijeti vasu adresu!'],
        unique: true
    },

    customer_city: {
        type: String,
        required: [true, 'Morate unijeti grad iz kojeg dolazite!']
    },

    customer_email: {
        type: String,
        required: [true, 'Morate unijeti vasu e-mail adresu!'],
        unique: true,
        lowercase: true,
        validate:[ isEmail, 'Morate unijeti validnu e-mail adresu.']
    },

    customer_password: {
        type: String,
        required: [true, 'Morate unijeti vasu lozinku!'],
        minlength: [6, 'Vasa lozinka mora imati minimalno 6 znakova!']
    }

});


const Customer = mongoose.model('customer', customersSchema);


module.exports = Customer;

