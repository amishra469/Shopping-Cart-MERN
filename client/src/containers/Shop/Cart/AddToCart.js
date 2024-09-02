import React from 'react';
import styled from 'styled-components';

const AddToCartButton = styled.button`
    padding: 12px 24px;
    font-size: 1rem;
    color: #ffffff;
    background-color: ${props => props.theme.buttonBackground}; /* Button background based on theme */
    border: 2px solid transparent; /* Ensure no outline border initially */
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        background-color: ${props => props.theme.buttonHoverBackground}; /* Button hover background based on theme */
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }

    &:focus {
        outline: ${props => props.theme.name === 'light' ? 'none' : 'auto'}; /* Remove outline only for light theme */
        border: ${props => props.theme.name === 'light' ? 'none' : `2px solid ${props.theme.linkActiveColor}`}; /* Custom focus border for non-light themes */
    }

    &:active {
        background-color: ${props => props.theme.buttonHoverBackground}; /* Button active background based on theme */
        transform: translateY(1px);
    }
`;

const AddToCart = ({ id }) => {
    const handleAddCart = async () => {
        try {
            const response = await fetch('http://localhost:8080/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Server Response:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <AddToCartButton onClick={handleAddCart}>
            Add to Cart
        </AddToCartButton>
    );
};

export default AddToCart;
