// // // module.exports[
// // //     {
// // //     "brand": "casio",
// // //     "model": "l320",
// // //     "price": "2000",
// // //     "color": ["black", "white"],
// // //     "dial": "digital",
// // //     "waterproof": "yes",
// // //     "caseshape": "circle",
// // //     "warranty": "12 months"
// // //     }
// // // ]

// const brands = ['Casio','FastTrack',"Timewear","LORENZ","Noise","REDUX","TIMEX","Sonata","Titan", "Fossil","Matrix","SF","BoAt"]
// const models = ['l123','321d','234d','4fefvw3','r23r4f','evvd3','vedvs4','33wdw','3rfde3','edvw3','wef3','q3d3','23r3d']
// const colors = ['white','green','red',['white','black'],'blue']
// const dials = ['Digital','Analog']
// const caseshapes = ['rounded','square','rectangle']
// const warrantys = ['1 year','2 year','3 year','5 year','10 year','6 months']

// let items = []

// function getint(max) {
//   return Math.floor(Math.random() * max);
// }

// for (let x = 0;x<=50;x++){
//     const products = new Object()
//     products.brand = brands[getint(brands.length)]
//     products.model = models[getint(models.length)]
//     products.price = Math.floor(Math.random() * (4999 - 499) + 499);
//     products.color = colors[getint(colors.length)]
//     products.image = 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1230&q=80'
//     products.dial = dials[getint(dials.length)]
//     products.waterproof = (products.price > 1500)? "Yes" : "No";
//     products.caseshape = caseshapes[getint(caseshapes.length)]
//     products.warranty = warrantys[getint(warrantys.length)]
//     items.push(products)
// }

// // module.exports = items;
// console.log(items);

const mongoose = require('mongoose');
const User = require('../models/users');

mongoose.connect('mongodb://localhost:27017/watch-store')
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seeddb1 = async () => {
    // await User.deleteMany({});
    const admins = new User({
        username: "admin1",
        password: "spic2002",
        email: "spic2002@gmail.com",
        isAdmin: true
    })
    await admins.save();
}

seeddb1().then(() => {
    console.log('Process 1 succeed');
    mongoose.connection.close();
    console.log('Mogoose connection Closed');
})