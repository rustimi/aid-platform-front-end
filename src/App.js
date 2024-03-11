import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import {isAuthenticated} from './components/AuthContext';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import DashboardPage from './pages/DashboardPage';
import ActiveRequestsPage from './pages/ActiveRequestsPage';
import NewRequestPage from './pages/NewRequestPage';
import ChatPage from './pages/ChatPage';
import UserInfoPage from './pages/UserInfoPage';
import NotFoundPage from './pages/NotFoundPage';


const ProtectedRoute = ({ element: Component }) => {
  const auth = isAuthenticated();
  return auth ? Component : <Navigate to="/login" replace />;
};

const NotIfUserAuthenticatedRoute = ({ element: Component }) => {
  const auth = isAuthenticated();
  return !auth ? Component : <Navigate to="/dashboard" replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: (<NotIfUserAuthenticatedRoute element={<LoginPage />} />),
  },
  {
    path: '/signup',
    element: (<NotIfUserAuthenticatedRoute element={<SignupPage />} />),
  },
  {
    path: '/logout',
    element: (<ProtectedRoute element={<LogoutPage />} />),
  },
  {
    path: '/dashboard',
    element: (<ProtectedRoute element={<DashboardPage />} />),
  },
  {
    path: '/user',
    element: (<ProtectedRoute element={<UserInfoPage />} />),
  },
  {
    path: '/requests',
    element: (<ProtectedRoute element={<ActiveRequestsPage />} />),
  },
  {
    path: '/requests/new',
    element: (<ProtectedRoute element={<NewRequestPage />} />),
  },
  {
    path: '/requests/:id/chat',
    element: (<ProtectedRoute element={<ChatPage />} />),
  }

]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
