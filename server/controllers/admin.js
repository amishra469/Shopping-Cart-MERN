const Product = require('../models/product');

// Endpoint to get the form for adding a product (for documentation or API description)
exports.getAddProduct = (req, res, next) => {
    res.json({
        message: 'This endpoint returns a form for adding a product. In an API-only context, this may not be needed.'
    });
};

// Endpoint to handle adding a product
exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.status(201).json({
        message: 'Product added successfully',
        product: product
    });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
    updatedProduct.save();
    res.status(201).json({
        message: 'Product Updated successfully',
        product: updatedProduct
    });
}

// Endpoint to fetch all products
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.json({
            products: products
        });
    });
};

exports.deleteProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.json({
            products: products
        });
    });
};