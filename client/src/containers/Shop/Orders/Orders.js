import React, { useState, useEffect } from 'react';
import './Orders.css';

const Orders = () => {
    const [orderProducts, setOrderProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch('http://localhost:8080/orders'); // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }
                const data = await response.json();
                setOrderProducts(data.orderProducts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="cart-container">
            {orderProducts.map((order) => (
                <div key={order.productData.id} className="cart-item">
                    <div className="cart-item-content">
                        <div className="image-container">
                            <img src={order.productData.imageUrl} alt={order.productData.title} className="cart-item-image" />
                        </div>
                        <div className="cart-item-details">
                            <div className="cart-item-title">{order.productData.title}</div>
                            <div className="cart-item-description">{order.productData.description}</div>
                            <div className="cart-item-info">
                                <p className="cart-item-price">Price: Rs {order.productData.price}</p>
                                <p className="cart-item-quantity">Quantity: {order.qty}</p>
                                <p className="cart-item-edd">Estimated Delivery: {new Date(order.edd).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Orders;
