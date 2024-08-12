import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductList = async () => {
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
                setProductList(result.products)

            } catch (error) {
                console.log(error);
                setProductList([]);
            }
        }

        fetchProductList();
    }, [])

    const getItemDetails = (item) => {
        navigate(`/productdetails?id=${item.id}`);
    };

    return (
        <div className="home-container">
            <div className="product-grid">
                {productList.map((item, index) => (
                    <div key={item.title + index} className="card">
                        <img src={item.imageUrl || "https://via.placeholder.com/150"} className="card-img" alt={item.title} />
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text">Rs {item.price}</p>
                            <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                                <button className="btn-add-to-cart" onClick={() => getItemDetails(item)}>Details</button>
                                <button className="btn-add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList
