import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand">Shopping Cart</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPath === "/" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPath === "/products" ? "active" : ""}`} to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPath === "/cart" ? "active" : ""}`} to="/cart">Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPath === "/orders" ? "active" : ""}`} to="/orders">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPath === "/admin/add-product" ? "active" : ""}`} to="/admin/add-product">Add Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPath === "/admin/products" ? "active" : ""}`} to="/admin/products">Admin Products</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
