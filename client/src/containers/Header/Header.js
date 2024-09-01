import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import ThemeToggle from "../../components/ThemeToggle";

const NavBar = styled.nav`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.color};
`;

const NavBrand = styled.span`
  font-weight: bold;
  color: ${props => props.theme.color};
`;

const NavLink = styled(Link)`
  margin-right: 15px;
  color: ${props => props.theme.color};
  font-weight: 500;

  &.active {
    color: ${props => props.theme.linkActiveColor};
  }
`;

const NavTogglerIcon = styled.span`
  filter: ${props => props.theme.name === 'dark' ? 'invert(1)' : 'invert(0)'};
`;

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <NavBar className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <NavBrand className="navbar-brand">Shopping Cart</NavBrand>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <NavTogglerIcon className="navbar-toggler-icon"></NavTogglerIcon>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={currentPath === "/" ? "active nav-link" : "nav-link"} to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={currentPath === "/products" ? "active nav-link" : "nav-link"} to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={currentPath === "/cart" ? "active nav-link" : "nav-link"} to="/cart">Cart</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={currentPath === "/orders" ? "active nav-link" : "nav-link"} to="/orders">Orders</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={currentPath === "/admin/products" ? "active nav-link" : "nav-link"} to="/admin/products">Admin Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={currentPath === "/admin/edit-product" ? "active nav-link" : "nav-link"} to="/admin/edit-product">Add Product</NavLink>
                        </li>
                        <li>
                            <ThemeToggle />
                        </li>
                    </ul>
                </div>
            </div>
        </NavBar>
    );
}

export default Header;
