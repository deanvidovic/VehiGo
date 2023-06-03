const { Router } = require('express');
const authController = require('../controllers/authController');
const { isAdmin } = require("../middleware/workerMiddleware");
const router = Router();


router.get('/signup', isAdmin, authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/signin', isAdmin, authController.signin_get);
router.post('/signin', authController.signin_post);

router.get('/logout', isAdmin, authController.logout_get)

module.exports = router;