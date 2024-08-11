import React from 'react';
import './AddProduct.css';

const AddProduct = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => { 
            data[key] = value;
        });

        try {
            const response = await fetch('http://localhost:8080/admin/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
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
        <div className="add-product-container">
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" name="imageUrl" id="imageUrl" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" step="0.01" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" rows="5" className="form-input" required></textarea>
                </div>
                <button className="btn" type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;
