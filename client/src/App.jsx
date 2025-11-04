import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import './App.css';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error/Error';
import HomePage from './pages/Home/Home.jsx';
import SearchPage, {
    loader as productsLoader,
    action as searchAction,
} from './pages/SearchPage/SearchPage';
import AuthPage, {action as authAction} from './pages/Auth/Authentication.jsx';
import ActivateAccount, {loader as activateEmailLoader,} from './pages/ActivateAccount/ActivateAccount.jsx';
import ResetPassword, {action as resetPasswordAction,} from './pages/ResetPassword/ResetPassword.jsx';
import ResetPasswordFormPage, {
    action as resetPasswordFormPageAction,
} from './pages/ResetPasswordForm/ResetPasswordForm.jsx';
import {action as logoutAction} from './components/Auth/Logout.jsx';

import ProductDetailsPage, {
    loader as productDetailsLoader,
} from './pages/ProductDetails/ProductDetails';
import EditProductPage, {
    loader as editProductLoader,
} from './pages/EditProduct/EditProduct';
import NewProductPage, {
    loader as newProductLoader,
} from './pages/NewProduct/NewProduct';

import ProtectedRoute from './pages/ProtectedRoute.jsx';
import {tokenLoader} from './utils/auth.js';
import ProfilePage, {loader as profileLoader} from './pages/Profile/Profile.jsx';
import ProfileSettingsPage from './pages/ProfileSettings/ProfileSettings.jsx';
import FavoritesPage, {
    loader as favoritesLoader,
} from './pages/Favorites/Favorites';
import UserProductsPage from './pages/UserProducts/UserProducts';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: 'root',
        loader: tokenLoader,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'search',
                element: <SearchPage />,
                loader: productsLoader,
                action: searchAction,
            },

            { path: 'auth', element: <AuthPage />, action: authAction },
            { path: 'logout', action: logoutAction },
            {
                path: 'activate-account',
                element: <ActivateAccount />,
                loader: activateEmailLoader,
            },
            {
                path: 'reset-password',
                element: <ResetPassword />,
                action: resetPasswordAction,
            },
            {
                path: 'reset-password-form',
                element: <ResetPasswordFormPage />,
                action: resetPasswordFormPageAction,
            },
            {
                path: 'product/:productId',
                element: <ProductDetailsPage />,
                loader: productDetailsLoader,
            },
            {
                path: 'profile',
                element: <ProtectedRoute />,
                id: 'profile-root',
                loader: profileLoader,
                children: [
                    { index: true, element: <ProfilePage /> },
                    { path: 'profile-settings', element: <ProfileSettingsPage /> },

                    {
                        path: 'user-products',
                        element: <UserProductsPage />,
                        loader: productsLoader,
                        action: searchAction,
                    },
                    {
                        path: 'liked-products',
                        element: <FavoritesPage />,
                        loader: favoritesLoader,
                        action: searchAction,
                    },
                    {
                        path: 'edit-product/:productId',
                        element: <EditProductPage />,
                        loader: editProductLoader,
                    },
                    {
                        path: 'new-product',
                        element: <NewProductPage />,
                        loader: newProductLoader,
                    },

                ],
            },
        ],
    },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;