const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    reservation_car_id: {
        type: String,
        unique: false
    },

    reservation_car_url: {
        type: String,
        unique: false
    },

    reservation_start: {
        type: Date,
        required: [true, 'Morate unijeti datum preuzimanja vozila!']
    },

    reservation_end: {
        type: Date,
        required: [true, 'Morate unijeti datum vracanja vozila!']
    },

    reservation_user_id: {
        type: String,
        unique: false
    },
});

const Reservation = mongoose.model('reservation', reservationSchema);


module.exports = Reservation;

