import React from 'react'

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
    }

    return (
        <>
            <button className="btn-add-to-cart" onClick={() => handleAddCart()}>Add to Cart</button>
        </>
    )
}

export default AddToCart
