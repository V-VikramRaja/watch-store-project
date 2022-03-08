const mongoose = require('mongoose');
const Product = require('../models/products');

mongoose.connect('mongodb://localhost:27017/watch-store')
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const brands = ['Casio','FastTrack',"Timewear","LORENZ","Noise","REDUX","TIMEX","Sonata","Titan", "Fossil","Matrix","SF","BoAt"]
const models = ['G-Shock i1 SuperFit','SF-G7 Comfort S','T-ref1 V 23 Super-Sigzer','time-tool 20 super-light','RGr1 Comfort S','evvd3 SuperFit','vedvs4  super-light SuperFit','33wdw Comfort S','3rfde3  super-light','edvw3 SuperFit','wef3 super-light','q3d3  super-light','23r3d Comfort S']
const colors = ['white','green','red','white&black','blue']
const caseshapes = ['rounded', 'square', 'rectangle']
const genders = ['Men','Women','Kids']
const images = ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80',
                'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
                'https://images.unsplash.com/photo-1508962914676-134849a727f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
                'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80',
                'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                'https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=808&q=80',
                'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
                'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
                'https://images.unsplash.com/photo-1548169874-53e85f753f1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
                'https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=784&q=80',
                'https://images.unsplash.com/photo-1584208123923-cc027813cbcb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=968&q=80',
                'https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
                'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
                'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
                'https://images.unsplash.com/photo-1613710774862-d813121e6d44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
                'https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=804&q=80']

// let items = []

function getint(max) {
  return Math.floor(Math.random() * max);
}
const seeddb = async () => {
    await Product.deleteMany({});
    for (let x = 0; x <= 50; x++){
        const price = Math.floor(Math.random() * (4999 - 499) + 499);
        const stocks = Math.floor(Math.random() * (4999 - 499) + 499);
        const brand = brands[getint(brands.length)];
        const model = models[getint(models.length)];
        const items = new Product({
            author: '62010eef455b7bd0bf7d153a',
            brand,
            model,
            price,
            color: colors[getint(colors.length)],
            image: images[Math.floor(Math.random() * images.length)],
            warranty: getint(60),
            gender: genders[getint(genders.length)],
            stocks,
            description: `The all new ${brand}'s ${model} is here at just ${price} grab the deal Now!!!`
        })
        await items.save();
    }
}
seeddb().then(() => {
    console.log('Process 1 succeed');
    mongoose.connection.close();
    console.log('Mogoose connection Closed');
})

