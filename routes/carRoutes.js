const { Router } = require('express');
const carsController = require('../controllers/carsController');
const { checkUser, requireAuth } = require("../middleware/authMiddleware");

const router = Router();


router.get('/cars', carsController.cars_get)
router.post('/cars', carsController.cars_post)

router.get('/cars/:id', carsController.single_car)
router.post('/cars/:id', checkUser, carsController.reserve)

router.get('/reservation', requireAuth, carsController.reservation_get)
router.delete('/reservation/:id', requireAuth, carsController.reservation_delete)


module.exports = router;