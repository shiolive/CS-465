const express = require('express'); //express app
const router = express.Router(); //router logic
const authController = require('../controllers/authentication');

const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET,

  userProperty: 'payload',

  algorithms: ['RS256'],
});

//import controllers
const tripsController = require('../controllers/trips');

//define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

module.exports = router;