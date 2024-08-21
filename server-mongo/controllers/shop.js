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
    const cartProducts = [];
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            for (let product of products) {
                const cartProductData = cart.products.find((prod) => {
                    return prod.id === product.id
                }
                );
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }

            };
            res.json({
                cartProducts: cartProducts,
                totalAmount : cart.totalPrice
            });
        });
    });

};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
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
