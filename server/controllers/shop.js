const Product = require('../models/product');
const Cart = require('../models/cart');
const Orders = require('../models/orders');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.status(200).json({
            products: products
        });
    });
};

exports.getProductById = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, products => {
        res.status(200).json({
            products: products
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.status(200).json({
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
            res.status(200).json({
                cartProducts: cartProducts,
                totalAmount: cart.totalPrice
            });
        });
    });

};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
        res.status(201).json({
            products: product
        });
    });
};

exports.updateCart = (req, res, next) => {
    const cartDetails = req.body.cartDetails;
    Cart.updateCart(cartDetails);
    res.status(201).json({
        updatedCart: cartDetails
    });
};


exports.getOrders = (req, res, next) => {
    const orderProducts = [];
    Orders.getOrder(orders => {
        Product.fetchAll(products => {
            for (let order of orders.products) {
                const orderProductData = products.find((prod) => {
                    return prod.id === order.id
                }
                );
                if (orderProductData) {
                    orderProducts.push({ productData: orderProductData, qty: order.qty, edd: order.edd });
                }
            };

            res.status(200).json({
                orderProducts: orderProducts
            });
        });
    });
};

const getRandomDate = () => {
    const randomDays = Math.floor(Math.random() * 10) + 1;
    const date = new Date();
    date.setDate(date.getDate() + randomDays);
    let expectedDate =
        date.getFullYear() + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2) + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);

    return expectedDate;
}


exports.postOrders = (req, res, next) => {
    const orderDetails = req.body.orderdetails;
    let newOrders = orderDetails.map(order => {
        order.edd = getRandomDate();
        return order;
    });
    Orders.addOrder(newOrders);
    res.status(201).json({
        newOrders: newOrders
    });
};

exports.getCheckout = (req, res, next) => {
    res.json({
        checkoutDetails: {}
    });
};
