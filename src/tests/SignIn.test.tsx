import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import SignIn from '../pages/SignIn';
import { vi, type Mocked } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

const renderWithProviders = (component: React.ReactNode) => {
    return render(
        <AuthProvider>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </AuthProvider>
    );
};

describe('SignIn Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock initial auth check
        mockedAxios.get.mockResolvedValue({ data: { user: null } });
    });

    it('renders sign in form', () => {
        renderWithProviders(<SignIn />);
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    });

    it('handles input changes', () => {
        renderWithProviders(<SignIn />);
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('submits form and redirects on success', async () => {
        mockedAxios.post.mockResolvedValueOnce({
            data: {
                token: 'fake-token',
                user: { id: '1', email: 'test@example.com', name: 'Test User' }
            }
        });

        renderWithProviders(<SignIn />);

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith('/api/auth/signin', {
                email: 'test@example.com',
                password: 'password123'
            });
        });
    });

    it('displays error message on failure', async () => {
        mockedAxios.post.mockRejectedValueOnce({
            response: { data: { message: 'Invalid credentials' } }
        });

        renderWithProviders(<SignIn />);

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpass' } });
        fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
});
