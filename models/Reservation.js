const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    reservation_car_id: {
        type: String,
        unique: false
    },

    reservation_customer_id: {
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

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

});

const Reservation = mongoose.model('reservation', reservationSchema);


module.exports = Reservation;

