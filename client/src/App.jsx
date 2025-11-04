import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import './App.css';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error/Error';
import HomePage from './pages.Home/Home.jsx';
import AuthPage, {action as authAction} from './pages/Auth/Authentication.jsx';
import ActivateAccount, {loader as activateEmailLoader,} from './pages/ActivateAccount/ActivateAccount.jsx';
import ResetPassword, {action as resetPasswordAction,} from './pages/ResetPassword/ResetPassword.jsx';
import ResetPasswordFormPage, {
    action as resetPasswordFormPageAction,
} from './pages/ResetPasswordForm/ResetPasswordForm.jsx';
import {action as logoutAction} from './components/Auth/Logout.jsx';

import ProtectedRoute from './pages/ProtectedRoute.jsx';
import {tokenLoader} from './utils/auth.js';

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
                path: 'profile',
                element: <ProtectedRoute />,
                id: 'profile-root',
                children: [],
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