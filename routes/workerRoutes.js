const { Router } = require('express');
const workerController = require('../controllers/workersController');
const { requireWorkerAuth } = require('../middleware/workerMiddleware');
const router = Router();

// VRATITI REQUREADMINAUTH

router.get('/panel', workerController.get_cars)
router.get('/panel-reservations', workerController.get_reservations) 
router.get('/panel-workers', workerController.get_workers)





// router.get('/logout', adminController.logout_get)

module.exports = router;