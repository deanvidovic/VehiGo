const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');



const customerSchema = new mongoose.Schema({
    customer_driver_license_number: {
        type: String,
        unique: true,
        minlength: [8, 'Vas broj vozacke dozvole mora imati najmanje 8 znakova!'],
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
        validate:[isEmail, 'Morate unijeti validnu e-mail adresu.']
    },

    customer_password: {
        type: String,
        required: [true, 'Morate unijeti vasu lozinku!'],
        minlength: [6, 'Vasa lozinka mora imati minimalno 6 znakova!']
    }

});

customerSchema.statics.login = async function (customer_email, customer_password) {
    const customer = await this.findOne({ customer_email }); // this je za customer model

    if (customer) {
        const isPasswordValid = await bcrypt.compare(customer_password, customer.customer_password);

        if (isPasswordValid) {
            return customer;
        }

        throw Error('Vasa lozinka nije tocna!')
    } 

    throw Error('Vas e - mail nije tocan!');
    
}

customerSchema.pre('save', async function (next) {
    //this je objekt koji smo kreirali prije nego se spremi    
    const salt = await bcrypt.genSalt(); //generiramo neki salt koji cemo zakvacit na nasu sifru radi bolje i sigurnije enkripcije, funkcija je asinkrona
    this.customer_password = await bcrypt.hash(this.customer_password, salt)
    next();
});

const Customer = mongoose.model('customer', customerSchema);


module.exports = Customer;

