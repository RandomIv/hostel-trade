import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';

// Main
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import SearchPage from './pages/SearchPage';
import ErrorPage from './pages/Error/Error';

// Access Control
import AuthPage, {
  action as authAction,
} from './pages/AccessControl/Authentication';
import { action as logoutAction } from './pages/AccessControl/Logout.jsx';
// Products
import EditProductPage from './pages/Products/EditProduct';
import NewProductPage from './pages/Products/NewProduct';
import ProductDetailsPage from './pages/Products/ProductDetails';
// User
import ProfilePage from './pages/User/Profile';
import LikedProductsPage from './pages/User/LikedProducts';
import ProfileSettingsPage from './pages/User/ProfileSettings';
import UserProductsPage from './pages/User/UserProducts';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { tokenLoader } from './utils/auth.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      // Main
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },

      // Access Control
      { path: 'auth', element: <AuthPage />, action: authAction },
      { path: 'logout', action: logoutAction },

      // Products
      { path: 'product-details', element: <ProductDetailsPage /> },

      // User
      {
        path: 'profile',
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <ProfilePage /> },
          { path: 'profile-settings', element: <ProfileSettingsPage /> },

          // User Products
          { path: 'user-products', element: <UserProductsPage /> },
          { path: 'liked-products', element: <LikedProductsPage /> },

          { path: 'edit-product', element: <EditProductPage /> },
          { path: 'new-product', element: <NewProductPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
