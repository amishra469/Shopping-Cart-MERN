const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.json({
            products: products
        });
    });
};

exports.getProductById = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, products => {
        res.json({
            products: products
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.json({
            products: products
        });
    });
};

exports.getCart = (req, res, next) => {
    res.json({
        cartItems: []
    });
};

exports.postCart = (req, res, next) => {
    console.log(req.body)
    const prodId = req.body.productId;
    console.log(prodId)
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
        res.json({
            products: product
        });
    });
};

exports.getOrders = (req, res, next) => {
    res.json({
        orders: []
    });
};

exports.getCheckout = (req, res, next) => {
    res.json({
        checkoutDetails: {}
    });
};
