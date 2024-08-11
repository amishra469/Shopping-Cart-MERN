const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
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
