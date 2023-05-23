const { Router } = require('express');
const aboutController = require('../controllers/aboutController');
const router = Router();


router.get('/about', aboutController.about_get)

module.exports = router;