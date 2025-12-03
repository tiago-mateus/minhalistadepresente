import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { CreateListPage } from '../pages/dashboard/CreateListPage';
import { EditListPage } from '../pages/dashboard/EditListPage';
import { PublicListPage } from '../pages/public/PublicListPage';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/dashboard/lists/new', element: <CreateListPage /> },
          { path: '/dashboard/lists/:id/edit', element: <EditListPage /> },
        ],
      },
      { path: '/lista/:slug', element: <PublicListPage /> },
      { path: '*', element: <LoginPage /> },
    ],
  },
]);
