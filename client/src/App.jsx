import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import './App.css';

// Main
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error/Error';
import HomePage from './pages/Home/Home.jsx';
import AuthPage, {action as authAction} from './pages/Auth/Authentication.jsx';
import ActivateAccount, {loader as activateEmailLoader} from './pages/ActivateAccount/ActivateAccount.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: 'root',
        children: [
            { index: true, element: <HomePage/> },
            { path: 'auth', element: <AuthPage />, action: authAction },
            {
                path: 'activate-account',
                element: <ActivateAccount />,
                loader: activateEmailLoader,
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