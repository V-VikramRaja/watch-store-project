const Product = require('../models/products');
const Review = require('../models/review');

// Show review
module.exports.showReview = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.redirect(`/products/${product._id}`)
}

// create review
module.exports.makeReview = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    const review = await Review(req.body.review);
    review.author = req.user._id;
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success', 'Review Created Successfully');
    res.redirect(`/products/${product._id}`)
    // res.send(review)
}

// delete review
module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    Product.findByIdAndUpdate(id,{$pull:{reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Reviewdeleted Successfully');
    res.redirect(`/products/${id}`)
}