import React, { Component } from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../Layouts/RootLayout';
import AuthLayout from '../Layouts/AuthLayout';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import Home from '../pages/Home/Home/Home';
import Tutors from '../pages/Tutors/Tutors';
import StudySessions from '../pages/StudySession/StudySessions';
import CreateSession from '../pages/CreateSession/CreateSession';
import PrivateRoute from '../Routes/PrivateRoute';

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'tutors',
                Component: Tutors
            },
            {
                path: 'studysessions',
                element: <PrivateRoute>
                    <StudySessions />
                </PrivateRoute>
            },
            {
                path: 'createsession',
                Component: CreateSession
            }
        ]

    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }
]);

export default router;