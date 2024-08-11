import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../AppLayout/AppLayout';
import Home from '../Shop/Home/Home';
import AddProduct from '../Admin/AddProduct/AddProduct';
import Cart from '../Shop/Cart/Cart';
import Orders from '../Shop/Orders/Orders';
import Products from '../Admin/Products/Products';
import ErrorPage from '../AppLayout/ErrorPage';
import Header from '../Header/Header';
import ProductList from '../Shop/ProductList/ProductList';

const Routing = () => (
    <AppLayout>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </AppLayout>
);

export default Routing;
