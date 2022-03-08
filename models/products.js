const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')

const productSchema = new Schema({
    brand: String,
    model: String,
    price: Number,
    color: String,
    image: String,
    warranty: Number,
    stocks: Number,
    description: String,
    gender: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})


productSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;



