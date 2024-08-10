import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../AppLayout/ErrorPage';
import Home from '../Home/Home';
import AddProduct from '../AddProduct/AddProduct';

const Routing = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "/add-product",
        element: <AddProduct />,
        errorElement: <ErrorPage />
    },
])

export default Routing
