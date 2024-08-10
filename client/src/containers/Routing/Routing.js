import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../AppLayout/ErrorPage';
import Home from '../Home/Home';

const Routing = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    }
])

export default Routing
