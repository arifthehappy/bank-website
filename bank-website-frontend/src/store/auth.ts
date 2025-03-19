import { create } from 'zustand';
import { authService } from '../services/api';

interface Employee {
  id: string;
  did: string;
  name: string;
  role: string;
  permissions: string[];
  connectionId: string;
}

interface AuthState {
  isAuthenticated: boolean;
  employee: Employee | null;
  isLoading: boolean;
  error: string | null;
  connectionInvitation: any | null;
  login: (connectionId: string) => Promise<void>;
  logout: () => void;
  createInvitation: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  employee: null,
  isLoading: false,
  error: null,
  connectionInvitation: null,

  createInvitation: async () => {
    try {
      set({ isLoading: true, error: null });
      const invitation = await authService.createInvitation();
      set({ connectionInvitation: invitation });
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to create connection invitation' });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (connectionId: string) => {
    try {
      set({ isLoading: true, error: null });
      const { employee, token } = await authService.login(connectionId);
      localStorage.setItem('auth_token', token);
      set({ isAuthenticated: true, employee });
    } catch (error) {
      set({ error: 'Authentication failed' });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({ isAuthenticated: false, employee: null });
  },

  clearError: () => set({ error: null }),
}));