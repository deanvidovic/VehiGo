const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');

module.exports.cars_get = async (req, res) => {
  try {
    const collection = mongoose.connection.collection('cars'); 
    const cars = await collection.find().toArray();
    
    res.render('../views/sites/cars', { cars });
  } catch (err) {
    console.log("Greska pri dohvacanju")
  }
};

module.exports.single_car = async (req, res) => {
  try {
    const id = req.params.id;
    const collection = mongoose.connection.collection('cars'); 
    const cars = await collection.find().toArray();
    const car = cars.find((car) => car._id.toString() === id);
    
    if (car) {
      res.render('../views/sites/singleCar', { car });
    } else {
      console.log('Document not found');
      res.send('Document not found');
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.reserve = async (req, res) => {
  const { reservation_car_id, reservation_start, reservation_end } = req.body;

  try {
    const overlappingReservation = await Reservation.findOne({
      reservation_car_id,
      reservation_start: { $lt: reservation_end },
      reservation_end: { $gt: reservation_start }
    });

    if (overlappingReservation) {
      const reservedStart = overlappingReservation.reservation_start;
      const reservedEnd = overlappingReservation.reservation_end;

      const errors = handleErrors(new Error("Ovaj auto je vec rezerviran u odabranom terminu"), reservedStart, reservedEnd);

      return res.status(400).json({errors});
    }

    const reservation = await Reservation.create({
      reservation_car_id,
      reservation_start,
      reservation_end
    });

    res.status(201).json({ reservation });

  } catch (err) {
    const errors = handleErrors(err) 
    res.status(400).json({ errors })
  }
}

const handleErrors = (err, reservedStart, reservedEnd) => {
  let errors = {
    reservation_start: '',
    reservation_end: '',
    car_error: '',
    start_date: '',
    end_date: ''
  };

  if (err.message === 'Morate unijeti datum preuzimanja vozila!') {
    errors.reservation_start = 'Morate unijeti datum preuzimanja vozila!';
  }

  if (err.message === 'Morate unijeti datum vracanja vozila!') {
    errors.reservation_start = 'Morate unijeti datum vracanja vozila!';
  }

  if (err.message.includes('customer validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.message === 'Ovaj auto je vec rezerviran u odabranom terminu') {
    errors.car_error = 'Ovaj auto je vec rezerviran u odabranom terminu od ' + getDateFromIsoDate(reservedStart) + ' do ' + getDateFromIsoDate(reservedEnd);
  }

  return errors;
}

function getDateFromIsoDate(isoDate) {
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
}