const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    car_license_number: {
        type: String,
        unique: true,
        required: [true, 'Morate unijeti registraciju vozila!']
    },

    car_brand: {
        type: String,
        unique: false,
        required: [true, 'Morate unijeti brand vozila!']
    },

    car_model: {
        type: String,
        required: [true, 'Morate unijeti model vozila!']
    },

    car_type: {
        type: String,
        required: [true, 'Morate unijeti tip vozila!']
    },

    car_kilometers: {
        type: Number,
        unique: false,
        required: [true, 'Morate unijeti prijedene kilometre vozila!']
    },
    
    car_max_speed: {
        type: Number,
        unique:false,
        required: [true, 'Morate unijeti tip vozila!']
    },

    car_fuel_consumption: {
        type: Number,
        unique:false,
        required: [true, 'Morate unijeti tip vozila!']
    },

    car_seats: {
        type: Number,
        unique:false,
        required: [true, 'Morate unijeti tip vozila!']
    },

    car_fuel_type: {
        type: String,
        unique:false,
        required: [true, 'Morate unijeti tip vozila!']
    },

    car_horse_power: {
        type: Number,
        unique:false,
        required: [true, 'Morate unijeti tip vozila!']
    },

    car_year: {
        type: Number,
        unique:false,
        required: [true, 'Morate unijeti tip vozila!']
    },

    car_price: {
        type: Number,
        unique:false,
        required: [true, 'Morate unijeti tip vozila!']
    },

    car_url: {
        type: String,
        unique:false,
        required: [true, 'Morate unijeti url vozila!']
    }
});

const Car = mongoose.model('car', carSchema);


module.exports = Car;

