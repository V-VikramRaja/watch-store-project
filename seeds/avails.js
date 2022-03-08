const mongoose = require('mongoose');
const Avail = require('../models/avails');

mongoose.connect('mongodb://localhost:27017/watch-store')
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const brands = ['Casio','FastTrack',"Timewear","LORENZ","Noise","REDUX","TIMEX","Sonata","Titan", "Fossil","Matrix","SF","BoAt"]
const dials = ['digital','Analog']
const colors = ['White','Green','Red','White&black','Blue']
const caseshapes = ['Rounded', 'Square', 'Rectangle']
const genders = ['Men', 'Women', 'Kids','Unisex','Men&Women']

const seeddb = async () => {
    await Avail.deleteMany({});
    const avails = new Avail({
        brand: brands,
        color: colors,
        dial: dials,
        caseshape: caseshapes,
        gender: genders
    });
    await avails.save();
}

seeddb().then(() => {
    console.log('Process 1 succeed for avails');
    mongoose.connection.close();
    console.log('Mogoose connection Closed');
})