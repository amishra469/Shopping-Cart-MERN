import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../AppLayout/AppLayout';
import Home from '../Shop/Home/Home';
import Cart from '../Shop/Cart/Cart';
import Orders from '../Shop/Orders/Orders';
import ErrorPage from '../AppLayout/ErrorPage';
import Header from '../Header/Header';
import ProductList from '../Shop/ProductList/ProductList';
import ProductDetails from '../Shop/ProductDetails/ProductDetails';
import Products from '../Admin/Products';
import EditProduct from '../Admin/EditProduct';

const Routing = () => (
    <AppLayout>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/productdetails" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/edit-product" element={<EditProduct />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </AppLayout>
);

export default Routing;
