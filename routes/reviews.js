const express = require('express');
const router = express.Router({mergeParams: true});
const {reviewSchema} = require('../schema')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Product = require('../models/products');
const Review = require('../models/review');
const {isLoggedIn, isReviewAuthor, validateReview} = require('../middleware')
const reviews = require('../controllers/reviews')

// show reviews
router.get('/', reviews.showReview)

// ----------------post for review -------------
router.post('/',isLoggedIn,validateReview, catchAsync(reviews.makeReview))

// -----------------Delete for review
router.delete('/:reviewId',isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;

// Consider using router.routes