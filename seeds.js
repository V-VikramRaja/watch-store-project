const Product = require('./models/products');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/time-store')
    .then(() => {
        console.log("Okay database connected!!")
    }).catch(err => {
        console.log("Error connecting")
        console.log(err)
})


const seedProducts = [
    {
        brand: 'Titan',
        price: 2000,
        color: 'green'
    },
    {
        brand: 'Olimpics',
        price: 2000,
        color: 'green'
    },
    {
        brand: 'Octus',
        price: 2000,
        color: 'green'
    },
    {
        brand: 'Sifi',
        price: 2000,
        color: 'green'
    },
    {
        brand: 'Sonata',
        price: 2000,
        color: 'green'
    },
    {
        brand: 'Fastrack',
        price: 2000,
        color: 'green'
    },
]

Product.insertMany(seedProducts)
    .then(products => {
        console.log(products)
    }).catch(err => {
        console.log(err)
    })