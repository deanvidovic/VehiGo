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
