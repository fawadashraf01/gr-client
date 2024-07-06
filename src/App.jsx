import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import Login from './ui/Login';
import Signup from './ui/Signup';
import Home from './ui/Home';
import CredentialsState from './context/credentialsState';
import Dashboard from './ui/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

export default function App() {
  return (
    <div className="text-base">
      <CredentialsState>
        <RouterProvider router={router}>
          <ToastContainer /> {/* Add ToastContainer here */}
        </RouterProvider>
      </CredentialsState>
    </div>
  );
}
