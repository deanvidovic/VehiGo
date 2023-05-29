const mongoose = require('mongoose');

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