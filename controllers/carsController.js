const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');

module.exports.reservation_get = async (req, res) => {
  try {
    const collectionCars = mongoose.connection.collection('cars'); 
    const collectionReservation = mongoose.connection.collection('reservations'); 
    const cars = await collectionCars.find().toArray();
    const reservations = await collectionReservation.find().toArray();
    // console.log(reservations[0].reservation_car_url);
    res.render('../views/sites/reservations', { reservations, cars });
    
  } catch (err) {
    console.log("Greska pri dohvacanju", err)
  }
};

module.exports.reservation_delete = (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  Reservation.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/reservation' });
    })
    .catch(err => {
      console.log(err);
    })
};



module.exports.cars_post = async (req, res) => {
  try {
    const collection = mongoose.connection.collection('cars'); 
    const cars = await collection.find().toArray();

    
    res.status(201).json({ cars })
    
  } catch (err) {
    console.log("Greska pri dohvacanju", err)
  }
};


module.exports.cars_get = async (req, res) => {
  try {
    const collection = mongoose.connection.collection('cars'); 
    const cars = await collection.find().toArray();

    
    res.render('../views/sites/cars', { cars });
    
  } catch (err) {
    console.log("Greska pri dohvacanju", err)
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
  const { reservation_car_id, reservation_car_url, reservation_start, reservation_end, reservation_user_id } = req.body;
  try {
    const overlappingReservation = await Reservation.findOne({
      reservation_car_id,
      reservation_car_url,
      reservation_start: { $lte: reservation_end },
      reservation_end: { $gte: reservation_start },
      reservation_user_id
    });

    if (overlappingReservation) {
      const reservedStart = overlappingReservation.reservation_start;
      const reservedEnd = overlappingReservation.reservation_end;

      const errors = handleErrors(new Error("Ovaj auto je vec rezerviran u odabranom terminu"), reservedStart, reservedEnd);

      return res.status(400).json({errors});
    }

    if (reservation_user_id == undefined) {
      res.redirect('/signin');
    } else {
      const reservation = await Reservation.create({
        reservation_car_id,
        reservation_car_url,
        reservation_start,
        reservation_end,
        reservation_user_id
      });
  
      const success = { success: 'Uspjesno ste rezervirali automobil!' };
      res.status(201).json({ reservation, success });
    }
    
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