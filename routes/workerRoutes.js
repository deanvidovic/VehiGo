const { Router } = require('express');
const workerController = require('../controllers/workersController');
const { requireAdminAuth } = require('../middleware/workerMiddleware');
const { upload } = require("../middleware/uploadImage");
const router = Router();

// VRATITI REQUREADMINAUTH

router.get('/panel', requireAdminAuth, workerController.get_cars);
router.post('/panel', requireAdminAuth, workerController.post_cars);
router.post('/upload',requireAdminAuth,  upload.single('image'), (req, res) => { res.redirect("/panel") });
router.get('/panel-reservations', requireAdminAuth, workerController.get_reservations) ;
router.get('/panel-workers', requireAdminAuth, workerController.get_workers);

router.get('/admin', workerController.admin_get); 
router.post('/admin', workerController.admin_post);






// router.get('/logout', adminController.logout_get)

module.exports = router;