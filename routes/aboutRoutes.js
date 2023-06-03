const { Router } = require('express');
const aboutController = require('../controllers/aboutController');
const { isAdmin } = require("../middleware/workerMiddleware");
const router = Router();


router.get('/about', isAdmin, aboutController.about_get)

module.exports = router;