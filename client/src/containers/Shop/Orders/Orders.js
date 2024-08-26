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
        <div className="orders-container">
            <h2 className="orders-header">Your Orders</h2>
            <div className="orders-list">
                {orderProducts.map((order) => (
                    <div key={order.productData.id} className="order-card">
                        <div className="order-image">
                            <img src={order.productData.imageUrl} alt={order.productData.title} className="order-card-image" />
                        </div>
                        <div className="order-content">
                            <h3 className="order-title">{order.productData.title}</h3>
                            <p className="order-description">{order.productData.description}</p>
                            <div className="order-info">
                                <p className="order-price">Price: <strong>${order.productData.price}</strong></p>
                                <p className="order-quantity">Quantity: <strong>{order.qty}</strong></p>
                                <p className="order-edd">Estimated Delivery: <strong>{new Date(order.edd).toLocaleString()}</strong></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
