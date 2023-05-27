const { Router } = require('express');
const carsController = require('../controllers/carsController');
const router = Router();


router.get('/cars', carsController.cars_get)
router.get('/cars/:id', carsController.single_car)


module.exports = router;