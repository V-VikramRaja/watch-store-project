const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const availsSchema = new Schema({
    brand: [String, Array],
    color: [String, Array],
    caseshape: [String, Array],
    gender: [String, Array]
})

const Avail = mongoose.model('Avail', availsSchema);

module.exports = Avail;