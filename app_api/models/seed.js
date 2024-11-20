//bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

//read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('../travlr/app_server/data/trips.json', 'utf8'));

//delete any existing records, then insert seed data
const seedDB = async () => {
    //await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

//close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});