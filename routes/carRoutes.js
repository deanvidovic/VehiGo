const { Router } = require('express');
const carsController = require('../controllers/carsController');
const { checkUser } = require("../middleware/authMiddleware");

const router = Router();


router.get('/cars', carsController.cars_get)
router.get('/cars/:id', carsController.single_car)
router.post('/cars/:id', checkUser, carsController.reserve)

router.get('/reservation', carsController.reservation)


module.exports = router;