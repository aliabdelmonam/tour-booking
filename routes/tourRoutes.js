const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.post('/', tourController.createTour);

module.exports = router;
