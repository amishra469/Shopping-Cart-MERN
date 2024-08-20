import './Cart.css';
import React, { useEffect, useState } from 'react';

const Cart = () => {
    const [cartData, setCartData] = useState({ cartProducts: [], totalAmount: 0 });
    const [pendingUpdates, setPendingUpdates] = useState({});

    const fetchCartData = async () => {
        try {
            const response = await fetch('http://localhost:8080/cart');
            if (!response.ok) {
                throw new Error('Failed to fetch cart data');
            }
            const data = await response.json();
            setCartData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const handleDecrement = (id) => {
        setCartData(prevCartData => {
            const updatedProducts = prevCartData.cartProducts.map(item => {
                if (item.productData.id === id) {
                    const newQty = item.qty - 1;
                    if (newQty <= 0) {
                        return null; // Mark this item for removal
                    }
                    return { ...item, qty: newQty };
                }
                return item;
            }).filter(item => item !== null); // Remove items with quantity 0

            return {
                ...prevCartData,
                cartProducts: updatedProducts,
                totalAmount: updatedProducts.reduce((sum, item) => sum + item.qty * item.productData.price, 0),
            };
        });

        // Update the pendingUpdates state
        setPendingUpdates(prevUpdates => ({
            ...prevUpdates,
            [id]: (prevUpdates[id] || 0) - 1
        }));
    };

    const handleIncrement = (id) => {
        setCartData(prevCartData => {
            const updatedProducts = prevCartData.cartProducts.map(item => {
                if (item.productData.id === id) {
                    return { ...item, qty: item.qty + 1 };
                }
                return item;
            });

            return {
                ...prevCartData,
                cartProducts: updatedProducts,
                totalAmount: updatedProducts.reduce((sum, item) => sum + item.qty * item.productData.price, 0),
            };
        });

        // Update the pendingUpdates state
        setPendingUpdates(prevUpdates => ({
            ...prevUpdates,
            [id]: (prevUpdates[id] || 0) + 1
        }));
    };

    const saveChanges = async () => {
        // Send the batch update to the API
        try {
            const response = await fetch('http://localhost:8080/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pendingUpdates),
            });

            if (!response.ok) {
                throw new Error('Failed to update cart');
            }

            // Optionally, fetch the updated cart data
            fetchCartData();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="cart-container">
            {cartData.cartProducts.map((item, index) => (
                <div key={item.productData.id + index} className="cart-item">
                    <img src={item.productData.imageUrl} alt={item.productData.title} className="cart-item-image" />
                    <div className="cart-item-details">
                        <div className="cart-item-title">{item.productData.title}</div>
                        <div className="cart-item-price">Rs {item.productData.price}</div>
                    </div>
                    <div className="cart-item-right">
                        <button className="qty-btn" onClick={() => handleDecrement(item.productData.id)}>-</button>
                        <span className="cart-item-quantity">{item.qty}</span>
                        <button className="qty-btn" onClick={() => handleIncrement(item.productData.id)}>+</button>
                    </div>
                </div>
            ))}
            <div className="cart-total">
                <div className="cart-total-amount">Total: Rs {cartData.totalAmount}</div>
                <button className="btn-proceed" onClick={saveChanges}>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
