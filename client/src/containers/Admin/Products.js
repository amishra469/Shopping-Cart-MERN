import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';

const Products = () => {
    const [productList, setProductList] = useState([]);
    const [deleteModalState, setDeleteModalState] = useState({ isVisible: false, productId: null });
    const navigate = useNavigate();

    const fetchProductList = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setProductList(result.products);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProductList([]);
        }
    }, []);

    useEffect(() => {
        fetchProductList();
    }, [fetchProductList]);

    const handleEdit = (product) => {
        navigate("/admin/edit-product", { state: { product } });
    };

    const handleShowDelete = (id) => {
        setDeleteModalState({ isVisible: true, productId: id });
    };

    const handleHideDelete = () => {
        setDeleteModalState({ isVisible: false, productId: null });
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:8080/admin/delete-product', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: deleteModalState.productId }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await response.json();
            fetchProductList();
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            handleHideDelete();
        }
    };

    return (
        <div className="home-container">
            <div className="product-grid">
                {productList.map((item, index) => (
                    <div key={item.id + index} className="card">
                        <img src={item.imageUrl || "https://via.placeholder.com/150"} className="card-img" alt={item.title} />
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text">Rs {item.price}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <button className="btn-add-to-cart" onClick={() => handleEdit(item)}>Edit</button>
                                <button className="btn-add-to-cart" onClick={() => handleShowDelete(item.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {deleteModalState.isVisible && (
                <DeleteProduct
                    isShow={deleteModalState.isVisible}
                    handleClose={handleHideDelete}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Products;
