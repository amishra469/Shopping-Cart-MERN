const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'orders.json'
);

module.exports = class Orders {
    static addOrder(newOrders) {
        fs.readFile(p, (err, fileContent) => {
            let orders = { products: [] };
            if (!err) {
                orders = JSON.parse(fileContent);
            }
            orders.products = [...orders.products, ...newOrders];

            fs.writeFile(p, JSON.stringify(orders), (err) => {
                console.log(err)
            })
        })
    }

    static getOrder(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}