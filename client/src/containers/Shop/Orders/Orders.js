import React, { useState, useEffect } from 'react';
import './Orders.css';

const Orders = () => {
    const [orderProducts, setOrderProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch('http://localhost:8080/orders');
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
        <div className="orders-wrapper">
            <div className="orders-container">
                {orderProducts.length === 0 ? (
                    <div className="orders-empty">
                        <h3>No Order Found</h3>
                        <p>Your order list is empty. Please check back later.</p>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orderProducts.map((order, index) => (
                            <div key={order.productData.id + "-" + index} className="order-row">
                                <div className="order-image">
                                    <img src={order.productData.imageUrl} alt={order.productData.title} className="order-row-image" />
                                </div>
                                <div className="order-details">
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
                )}
            </div>
        </div>
    );
};

export default Orders;
