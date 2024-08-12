import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
    const [product, setProduct] = useState({
        id: null,
        imageUrl: null,
        title: null,
        description: null,
        price: null
    });
    const location = useLocation();

    const getIdFromUrl = () => {
        const queryParams = new URLSearchParams(location.search);
        let id = queryParams.get('id');
        return id;
    };

    const id = getIdFromUrl();
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setProduct(result.products);
            } catch (error) {
                console.log(error);
                setProduct({});
            }
        };

        fetchProductList();
    }, [id]);

    return (
        <div className="product-details-container">
            <div className="image-container">
                <img src={product.imageUrl || "https://via.placeholder.com/150"} alt={product.title || ""} className="product-image" />
            </div>

            <div className="details-container">
                <h2 className="product-title">{product.title || ""}</h2>
                <p><strong>ID:</strong> {product.id || ""}</p>
                <p><strong>Description:</strong> {product.description || ""}</p>
                <p><strong>Price:</strong> ${product.price || ""}</p>
            </div>
        </div>
    );
};

export default ProductDetails;
