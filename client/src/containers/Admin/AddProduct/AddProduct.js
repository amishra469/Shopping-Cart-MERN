import React from 'react';
import './AddProduct.css'; // Import the CSS file

const AddProduct = () => {
    return (
        <div className="add-product-container">
            <form className="product-form" action="/admin/add-product" method="POST">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" name="imageUrl" id="imageUrl" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" step="0.01" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" rows="5" className="form-input"></textarea>
                </div>

                <input type="hidden" name="productId" />

                <button className="btn" type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;
