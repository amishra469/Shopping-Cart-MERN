import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
    const { state } = useLocation();
    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        if (state?.product) {
            setFormData(state.product);
        }
    }, [state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/admin/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
        <div className="add-product-container">
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="form-input"
                        value={formData.title || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        className="form-input"
                        value={formData.imageUrl || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        step="0.01"
                        className="form-input"
                        value={formData.price || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        rows="5"
                        className="form-input"
                        value={formData.description || ''}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button className="btn" type="submit">{state?.product ? "Update Product" : "Add Product"}</button>
            </form>
        </div>
    );
}

export default EditProduct;
