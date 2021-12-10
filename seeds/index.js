const mongoose = require('mongoose');
const Campground = require('../models/campground');
const helper = require('./helper');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected!');
});

const randomSeed = function (seeds) {
    let size = seeds.length;
    let index = Math.floor(Math.random() * size);
    return seeds[index];
};

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        let randomName = randomSeed(helper.names);
        let randomDescription = randomSeed(helper.descriptions);
        let randomCity = randomSeed(helper.cities);
        let randomPrice = 100 + Math.floor(Math.random() * 400);
        let newCamp = new Campground({
            title: randomName,
            price: randomPrice,
            description: randomDescription,
            location: randomCity
        });
        await newCamp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});