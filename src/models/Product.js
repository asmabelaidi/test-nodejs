const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
nom: { type: String, required: true }, // Code Review Feedback:  Consider adding more validations such as: a minLength and/or maxLength to restrict the length of the 'nom' string. and {trim : true} option to the 'nom' property The property name that preventing unintentional whitespace-related issues.'nom' is currently in French while other properties are in English: rename it to an English equivalent name.
price: { type: Number, required: true }, // Code Review Feedback: Consider adding min / max validations to the price property which prevent unrealistic or unintended values for the product price
barcode: { type: String, required: true }, // Code Review Feedback: consider adding a unique constraint to the barcode property: unique: true. recommended to add Alphanumeric Uppercase Validations : {match: /^[A-Z0-9]+$/ }
state: { type: String, default: null }, // Code Review Feedback: Introduce a validation : enum ['ok', 'broken', 'reconditioned’'] for the 'type' property.
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
// Code Review Feedback: Improvement: We can use validation for data coming from the client like Joi validation. which we can use in route handlers. for example
//  const Joi = require('joi');
//        const productSchema = Joi.object({
//        nom: Joi.string().required().min(3).max(50).trim(),
//         price: Joi.number().required().min(0).max(1000000),
//         barcode: Joi.string().required().uppercase().regex(/^[A-Z0-9]+$/),
//         state: Joi.string().valid('ok', 'broken', 'reconditioned'),
//      });
// exports.productValidate = productSchema;