import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LikeBtn from './LikeBtn';
import { ensureAccessToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

vi.mock('@tanstack/react-query', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useMutation: vi.fn(),
    };
});

vi.mock('../../utils/auth');

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('LikeBtn component', () => {
    let mockedNavigate;
    let mockedMutateAsync;

    beforeEach(() => {
        vi.clearAllMocks();

        mockedNavigate = vi.fn();
        useNavigate.mockReturnValue(mockedNavigate);

        mockedMutateAsync = vi.fn().mockResolvedValue({ status: 'success' });
        useMutation.mockReturnValue({
            mutateAsync: mockedMutateAsync,
            isPending: false,
        });

        Storage.prototype.getItem = vi.fn((key) => 'test-value');
    });

    it('should render a solid heart when isLiked is true', () => {
        render(<LikeBtn productId="p1" isLiked={true} />, { wrapper });
        const icon = screen.getByRole('button').querySelector('i');
        expect(icon).toHaveClass('fa-solid', 'fa-heart');
        expect(icon).not.toHaveClass('fa-regular');
    });

    it('should render a regular heart when isLiked is false', () => {
        render(<LikeBtn productId="p1" isLiked={false} />, { wrapper });
        const icon = screen.getByRole('button').querySelector('i');
        expect(icon).toHaveClass('fa-regular', 'fa-heart');
        expect(icon).not.toHaveClass('fa-solid');
    });

    it('should call mutation and update icon on click when not liked', async () => {
        ensureAccessToken.mockResolvedValue(true);
        render(<LikeBtn productId="p1" isLiked={false} />, { wrapper });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockedMutateAsync).toHaveBeenCalledTimes(1);
            expect(button.querySelector('i')).toHaveClass('fa-solid');
        });
    });

    it('should call mutation and update icon on click when liked', async () => {
        ensureAccessToken.mockResolvedValue(true);
        render(<LikeBtn productId="p1" isLiked={true} />, { wrapper });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockedMutateAsync).toHaveBeenCalledTimes(1);
            expect(button.querySelector('i')).toHaveClass('fa-regular');
        });
    });

    it('should navigate to login page on click if user is not authenticated', async () => {
        ensureAccessToken.mockResolvedValue(false);
        render(<LikeBtn productId="p1" isLiked={false} />, { wrapper });

        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/auth?mode=login');
            expect(mockedMutateAsync).not.toHaveBeenCalled();
        });
    });
});