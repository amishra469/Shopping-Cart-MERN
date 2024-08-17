import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';

const Products = () => {
    const [productList, setProductList] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteProd, setDeleteProd] = useState("");
    const navigate = useNavigate();

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
            setProductList(result.products);

        } catch (error) {
            console.log(error);
            setProductList([]);
        }
    }

    useEffect(() => {
        fetchProductList();
    }, [])

    const handleEdit = (product) => {
        navigate("/admin/edit-product", { state: { product } });
    }

    const handleShowDelete = (id) => {
        setDeleteProd(id);
        setIsDelete(true);
    }

    const handleHideDelete = () => {
        setIsDelete(false);
    }

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:8080/admin/delete-product', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: deleteProd }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await response.json();
            fetchProductList();
        } catch (error) {
            console.log(error);
        }
        finally {
            handleHideDelete();
        }
    }

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


            {
                isDelete ?
                    <DeleteProduct
                        isShow={isDelete}
                        handleClose={handleHideDelete}
                        handleDelete={handleDelete}
                    /> : ""
            }
        </div>
    );
}

export default Products;
