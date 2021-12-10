const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const db = mongoose.connection;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected!');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/createcampground', async (req, res) => {
    const camp = new Campground({ title: 'Stupid Yard', price: '$110', description: 'For studpid junkies only', location: 'Toronto' });
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('Serving on port 3000!');
});