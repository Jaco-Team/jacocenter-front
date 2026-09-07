import { create } from 'zustand';

interface AuthState {
  login: string;
  phone: string;
  password: string;
  code: string;
  newPassword: string;
  repeatNewPassword: string;
  setLogin: (login: string) => void;
  setPhone: (phone: string) => void;
  setPassword: (password: string) => void;
  setCode: (code: string) => void;
  setNewPassword: (password: string) => void;
  setRepeatNewPassword: (password: string) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  login: '',
  phone: '',
  password: '',
  code: '',
  newPassword: '',
  repeatNewPassword: '',
  setLogin: (login) => set({ login }),
  setPhone: (phone) => set({ phone }),
  setPassword: (password) => set({ password }),
  setCode: (code) => set({ code }),
  setNewPassword: (newPassword) => set({ newPassword }),
  setRepeatNewPassword: (repeatNewPassword) => set({ repeatNewPassword }),
  reset: () =>
    set({
      login: '',
      phone: '',
      password: '',
      code: '',
      newPassword: '',
      repeatNewPassword: '',
    }),
}));