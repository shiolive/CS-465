const express = require('express'); //express app
const router = express.Router(); //router logic

//import controllers
const tripsController = require('../controllers/trips');

//define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;