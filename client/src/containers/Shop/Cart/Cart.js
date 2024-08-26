import './Cart.css';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Cart = () => {
    const [cartData, setCartData] = useState({ cartProducts: [], totalAmount: 0 });
    const cartRef = useRef(null);
    cartRef.current = cartData;
    const navigate = useNavigate(); // Initialize useNavigate

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
    };

    const saveChanges = async () => {
        const updatedCart = {
            products: cartRef.current.cartProducts.map(item => ({
                id: item.productData.id,
                qty: item.qty
            })),
            totalPrice: cartRef.current.totalAmount
        };

        try {
            const response = await fetch('http://localhost:8080/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartDetails: updatedCart }),
            });

            if (!response.ok) {
                throw new Error('Failed to update cart');
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCartData();

        return () => {
            saveChanges();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleProceedToCheckout = () => {
        const confirmed = window.confirm("Are you sure you want to proceed to checkout?");
        if (confirmed) {
            navigate('/orders'); // Redirect to orders page
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
                <button className="btn-proceed" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
