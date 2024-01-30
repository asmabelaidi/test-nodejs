const Product = require('../models/Product');

const productService = {
     // Code Review Feedback: Remove repeating try-catch blocks and use error middlewares for example we can use express-async-errors with winston.
    findAll: async (req, res) => {
        try {
        const products = await Product.find();
        res.json(products);  //Code Review Feedback: Recommend add HTTP status code in the response enhances communication between the client and server:  res.status(200).json(products);
        } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); 
        }
    },
    find: async (req, res) => {
        try { 
        const product = Product.findById(req.params.id);
        res.json(product); //Code Review Feedback: Recommend add HTTP status code in the response enhances communication between the client and server:  res.status(200).json(product)
        } catch (error) { 
        res.status(404).json({ error: 'Product not found' });
        }
    },
    save: async (req, res) => {
        // Code Review Feedback: Before adding new product its recommended to validate the inputs for example with joi: 
        // const {productValidate} = require('../models/Product');
        // const {error} = productValidate(req.body)
        // if(error) return res.status(400).send(error)
        // Code Review Feedback: After That we check if the product already exists: 
        //  const product = await Product.find({barcode: req.body.barcode}) <
        // if(product.length !== 0) return res.status(400).send('product Already Exists ')
    
        try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.json(savedProduct); //Code Review Feedback: Recommend add HTTP status code in the response enhances communication between the client and server:  res.status(200).json(savedProduct)
        } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
        }
    },
    delete: async (req, res) => {
        try {
        // Code Review Feedback: Recommended to check if the product exists: 
        //  const product = await Product.findById(req.params.id); 
        //  if(product === undefined) return res.status(404).send('This product does not exist, Entre a valid product please')
        await Product.findByIdAndRemove(req.params.id);
        res.sendStatus(204); //  Code Review Feedback: Including the deleted product in the response allows the client to confirm the deletion and may be beneficial for user feedback.
        } catch (error) {
        res.status(404).json({ error: 'Product not found' });
        }
    },
    getInventory: async (req, res) => {
        try {
            const inventory = {};
        try {
            const products = await Product.find();
            for (let i = 0; i < products.length; i++) {  // Code Review Feedback: you might consider using forEach for a more concise and expressive syntax with less variables (i), for example: products.forEach((p) => { const productName = p.nom; ...}
            const p = products[i];
            const productName = p.nom; // Code Review feedback: Consider enforcing a consistent lowercase format for product names during processing, as its montioned in the specifications: productName: p.nom.toLowerCase()
            if (productName) { 
               if (inventory.hasOwnProperty(productName)) {
                const productItem = inventory[productName];
                if (p.state !== 'broken') {
                productItem.qty += 1;
                productItem.totalPrice += p.price;
                productItem.productBarcodes += "," + p.barcode;
                }
                } else {
                inventory[productName] = {
                pName: productName,
                qty: 1,
                totalPrice: p.price,
                productBarcodes: p.barcode,
                };
                }
                }
                };
                } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
                }
                res.json(inventory); //Code Review Feedback: Recommend add HTTP status code in the response enhances communication between the client and server:  res.status(200).json(inventory)
                } catch (error) { 
                res.status(500).json({ error: 'Internal Server Error' });
                }
                // Code Review Feedback: The specifications indicate the presence of an update action, but it is not implemented in the provided code.
    },
};
    module.exports = productService;
    