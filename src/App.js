import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
// import ActiveRequestsPage from './pages/ActiveRequestsPage';
// import NewRequestPage from './pages/NewRequestPage';
// import ChatPage from './pages/ChatPage';
// import UserInfoPage from './pages/UserInfoPage';
import NotFoundPage from './pages/NotFoundPage';
// import ProtectedRoute from './components/ProtectedRoute'; // Assuming ProtectedRoute is a component

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    // children: [
      // { path: 'signup', element: <SignupPage /> },
      // { path: 'login', element: <LoginPage /> },
    //   { path: 'user-info', element: <UserInfoPage /> },
    //   {
    //     path: 'dashboard',
    //     element: (
    //       <ProtectedRoute>
    //         <DashboardPage />
    //       </ProtectedRoute>
    //     ),
    //     children: [
    //       { path: 'active-requests', element: <ActiveRequestsPage /> },
    //       { path: 'new-request', element: <NewRequestPage /> },
    //       { path: 'chat', element: <ChatPage /> },
    //       { index: true, element: <Navigate to="active-requests" replace /> },
    //     ],
    //   },
    // ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
