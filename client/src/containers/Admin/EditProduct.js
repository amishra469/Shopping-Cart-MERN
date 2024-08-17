import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditProduct.css';

const EditProduct = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        imageUrl: '',
        price: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state?.product) {
            setFormData(state.product);
        }
    }, [state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let url = '';
        let method = '';

        if (state?.product) {
            url = 'http://localhost:8080/admin/edit-product';
            method = 'PUT';
        } else {
            url = 'http://localhost:8080/admin/add-product';
            method = 'POST';
        }

        try {
            const response = await fetch(url, {
                method,
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
            toast.success('Product saved successfully!'); // Show success toast
            navigate('/admin/products'); // Redirect after success
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to save product. Please try again.'); // Show error toast
        } finally {
            setLoading(false);
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
                        value={formData.title}
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
                        value={formData.imageUrl}
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
                        value={formData.price}
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
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button className="btn" type="submit" disabled={loading}>
                    {loading ? 'Saving...' : state?.product ? 'Update Product' : 'Add Product'}
                </button>
            </form>
            <ToastContainer /> {/* Add ToastContainer component */}
        </div>
    );
};

export default EditProduct;
