// Requirement schema for serverside validation
const Joi = require('joi');

module.exports.productSchema = Joi.object({
    product: Joi.object({
        brand: Joi.string().required(),
        model: Joi.string().required(),
        price: Joi.number().required().min(0),
        color: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        gender: Joi.string().required(),
        warranty: Joi.number().required().min(0),
        stocks: Joi.number().required().min(10),
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})

