const { Router } = require('express');
const carsController = require('../controllers/carsController');
const { checkUser, requireAuth } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/workerMiddleware");

const router = Router();


router.get('/cars', isAdmin, carsController.cars_get)
router.post('/cars',  carsController.cars_post)

router.get('/cars/:id', isAdmin, carsController.single_car)
router.post('/cars/:id', checkUser, carsController.reserve)

router.get('/reservation', isAdmin, requireAuth, carsController.reservation_get)
router.delete('/reservation/:id', isAdmin, requireAuth, carsController.reservation_delete)


module.exports = router;