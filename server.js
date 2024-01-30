const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./src/routes/productRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://admin:1234@localhost:27017/database', { // Code review feedback: Refactor the MongoDB connection string to use environment variables for sensitive information: example : const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE } = process.env; mongoose.connect(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`);
useNewUrlParser: true, useUnifiedTopology: true });     
app.use(express.json());
app.use('/', productRoutes); // Use productRoutes under '/products' path: app.use('/products', productRoutes)
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`); // if we used winston to log errors it's better to use it here too
});

// Inhancement : Utilizing  for example express-async-errors simplifies error handling in asynchronous route handlers.
// Integrating winston for logging enhances error tracking and debugging. 
// require at the beginning of the application : require('express-async-errors');
// create a middleware folder contains error.js and  Set up winston for logging errors inside it 
// for example const winston = require('winston');
// configure winston settings, transports, etc.

//  Suggestion: Consider adding tests to ensure code reliability and maintainability and ease of future enhancements, like unit testing