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
import DashboardLayout from '../Layouts/DashboardLayout';
import ViewBookedSession from '../pages/Dashboard/ViewBookedSession/ViewBookedSession';
import CreateNote from '../pages/Dashboard/CreateNote/CreateNote';
import ViewMaterials from '../pages/Dashboard/ViewMaterials/ViewMaterials';
import ManageNote from '../pages/Dashboard/ManageNote/ManageNote';
import ViewDetails from '../pages/Home/AvailableSessions/ViewDetails';
import Payment from '../pages/shared/payment/Payment';
import PaymentLayout from '../Layouts/PaymentLayout';

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'sessions/:id',
                element: <PrivateRoute>
                    <ViewDetails />
                </PrivateRoute>
            },
            {
                path: 'tutors',
                element: <PrivateRoute>
                    <Tutors />
                </PrivateRoute>
            },
            {
                path: 'studysessions',
                element: <PrivateRoute>
                    <StudySessions />
                </PrivateRoute>,

            },
            {
                path: 'createsession',
                element: <PrivateRoute>
                    <CreateSession />
                </PrivateRoute>
            }


        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
            {
                path: 'viewbookedsession',
                element: <ViewBookedSession />
            },
            {
                path: 'createNote',
                element: <CreateNote />
            },
            {
                path: 'manageNote',
                element: <ManageNote />
            },
            {
                path: 'viewMaterials',
                element: <ViewMaterials />
            }
        ]
    },
    {
        path: '/payment',
        element: <PrivateRoute>
            <PaymentLayout />
        </PrivateRoute>,
        children: [
            {
                path: ':sessionId',
                element: <PrivateRoute>
                    <Payment />
                </PrivateRoute>
            }
        ]
    }
]);


export default router;