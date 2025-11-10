import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import AuthForm from './AuthForm';

const renderWithDataRouter = (ui, route = '/') => {
    const router = createMemoryRouter(
        [
            {
                path: '/',
                element: ui,
            },
        ],
        {
            initialEntries: [route],
        }
    );

    return render(<RouterProvider router={router} />);
};

describe('AuthForm component', () => {
    it('should render the login form when mode is "login"', () => {
        renderWithDataRouter(<AuthForm />, '/?mode=login');

        expect(screen.getByRole('heading', { name: /увійдіть до свого акаунту/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/username або пошта/i)).toBeInTheDocument();
        expect(screen.queryByLabelText(/^username$/i)).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: /увійти/i })).toBeInTheDocument();
    });

    it('should render the signup form when mode is "signup"', () => {
        renderWithDataRouter(<AuthForm />, '/?mode=signup');

        expect(screen.getByRole('heading', { name: /долучайся до нашої спільноти/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/^username$/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /зареєструватись/i })).toBeInTheDocument();
    });

    it('should display an error message if error prop is provided', () => {
        const testError = { message: 'Неправильний логін або пароль' };
        renderWithDataRouter(<AuthForm error={testError} />, '/?mode=login');

        expect(screen.getByText(testError.message)).toBeInTheDocument();
    });
});