import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CartContainer, CartItem, CartItemImage, CartItemDetails,
    CartItemTitle, CartItemPrice, CartItemRight, QtyButton,
    CartItemQuantity, CartTotal, CartTotalAmount, ProceedButton,
    CartEmpty, CartEmptyTitle, CartEmptyText, StartShoppingButton
} from './CartStyle';

const Cart = () => {
    const [cartData, setCartData] = useState({ cartProducts: [], totalAmount: 0 });
    const cartRef = useRef(null);
    const navigate = useNavigate();
    const isNavigating = useRef(false);
    cartRef.current = cartData;

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
                        return null;
                    }
                    return { ...item, qty: newQty };
                }
                return item;
            }).filter(item => item !== null);

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

    const handleProceedToCheckout = async () => {
        const confirmed = window.confirm("Are you sure you want to proceed to checkout?");
        if (confirmed) {
            isNavigating.current = true;
            try {
                await updateCart(true);
                navigate('/orders');
            } catch (error) {
                console.error('Failed to proceed with checkout:', error);
                isNavigating.current = false;
            }
        }
    };

    const updateCart = async (isCheckout = false) => {
        let cart = [];
        if (!isCheckout) {
            cart = cartRef.current.cartProducts.map(item => ({
                id: item.productData.id,
                qty: item.qty
            }));
        }

        try {
            await fetch('http://localhost:8080/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartDetails: {
                        products: [...cart]
                    }
                }),
            });
        } catch (error) {
            console.error("Failed to update cart:", error);
        }
    };

    useEffect(() => {
        fetchCartData();
        return () => {
            if (!isNavigating.current) {
                updateCart();
            }
        };
    }, []);

    return (
        <CartContainer>
            {cartData.cartProducts.length > 0 ? (
                <>
                    {cartData.cartProducts.map((item, index) => (
                        <CartItem key={item.productData.id + index}>
                            <CartItemImage src={item.productData.imageUrl} alt={item.productData.title} />
                            <CartItemDetails>
                                <CartItemTitle>{item.productData.title}</CartItemTitle>
                                <CartItemPrice>Rs {item.productData.price}</CartItemPrice>
                            </CartItemDetails>
                            <CartItemRight>
                                <QtyButton onClick={() => handleDecrement(item.productData.id)}>-</QtyButton>
                                <CartItemQuantity>{item.qty}</CartItemQuantity>
                                <QtyButton onClick={() => handleIncrement(item.productData.id)}>+</QtyButton>
                            </CartItemRight>
                        </CartItem>
                    ))}
                    <CartTotal>
                        <CartTotalAmount>Total: Rs {cartData.totalAmount}</CartTotalAmount>
                        <ProceedButton onClick={handleProceedToCheckout}>Proceed to Checkout</ProceedButton>
                    </CartTotal>
                </>
            ) : (
                <CartEmpty>
                    <CartEmptyTitle>Your cart is empty</CartEmptyTitle>
                    <CartEmptyText>It looks like you haven't added any items to your cart yet.</CartEmptyText>
                    <StartShoppingButton onClick={() => navigate('/')}>Start Shopping</StartShoppingButton>
                </CartEmpty>
            )}
        </CartContainer>
    );
};

export default Cart;
