const express = require('express');
const router = express.Router();
const productService = require('../services/productService'); // Code Review Feedback:  Destructuring product services in productRoutes for better readability: const { findAll, find, save, delete, getInventory } = require('../services/productService');
router.get('/products', productService.findAll); // Code Review Feedback: Refactore productRoutes to eliminate route repetition: router.get('/', findAll);
router.get('/products/:id', productService.find); // Code Review Feedback: Refactore productRoutes to eliminate route repetition: router.get('/:id', find);
router.post('/products', productService.save);  // Code Review Feedback: Refactore productRoutes to eliminate route repetition: router.get('/', save);
router.delete('/products/:id', productService.delete); // Code Review Feedback: Refactore productRoutes to eliminate route repetition: router.delete('/:id', delete);
router.get('/products/inventory', productService.getInventory); // Code Review Feedback: Refactore productRoutes to eliminate route repetition: router.get('/inventory', getInventory);
module.exports = router;