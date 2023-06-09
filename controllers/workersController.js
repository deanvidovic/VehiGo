const { response } = require('express');
const mongoose = require('mongoose');

const Car = require('../models/Car');
//const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    //console.log(err.message, err.code);
    let errors = {
        worker_password: ''
    };

    if(err.message === 'Vasa lozinka ili korisnicko ime nije tocno!') {
        errors.worker_password = 'Vasa lozinka ili korisnicko ime nije tocno!';
    }

    if (err.message === "nekaj nie dobro") {
        errors.worker_password = "Nesto niste dobro unijeli.";
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

module.exports.post_cars = async (req, res) => {
    const {
        car_license_number,
        car_brand,
        car_model,
        car_type,
        car_kilometers,
        car_max_speed,
        car_fuel_consumption,
        car_seats,
        car_fuel_type,
        car_horse_power,
        car_year,
        car_price,
        car_url
    } = req.body;
    try {
        const car = await Car.create({
            car_license_number,
            car_brand,
            car_model,
            car_type,
            car_kilometers,
            car_max_speed,
            car_fuel_consumption,
            car_seats,
            car_fuel_type,
            car_horse_power,
            car_year,
            car_price,
            car_url
        });
    
        res.status(201).json({ car });
    }catch (err) {
        const errors = handleErrors(err) 
        res.status(400).json({ errors })
    }
}
      

module.exports.get_reservations = async (req, res) => {
    try {
      const collectionCars = mongoose.connection.collection('cars'); 
      const collectionReservation = mongoose.connection.collection('reservations'); 
      const collectionCustomers = mongoose.connection.collection('customers'); 
      const cars = await collectionCars.find().toArray();
      const reservations = await collectionReservation.find().toArray();
      const customers = await collectionCustomers.find().toArray();

      res.render('../views/panel/partials/reservations', { reservations, cars, customers });
      
    } catch (err) {
      console.log("Error occurred while fetching data", err);
      res.status(500).send("An error occurred");
    }
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

module.exports.logout_get = (req, res) => {
    res.cookie('jwtw', '', { maxAge:1 });
    res.redirect('/');
}

