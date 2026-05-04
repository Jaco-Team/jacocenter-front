import { create } from 'zustand';

interface AuthState {
  phone: string;
  password: string;
  code: string;
  newPassword: string;
  repeatNewPassword: string;
  setPhone: (phone: string) => void;
  setPassword: (password: string) => void;
  setCode: (code: string) => void;
  setNewPassword: (password: string) => void;
  setRepeatNewPassword: (password: string) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  phone: '',
  password: '',
  code: '',
  newPassword: '',
  repeatNewPassword: '',
  setPhone: (phone) => set({ phone }),
  setPassword: (password) => set({ password }),
  setCode: (code) => set({ code }),
  setNewPassword: (newPassword) => set({ newPassword }),
  setRepeatNewPassword: (repeatNewPassword) => set({ repeatNewPassword }),
  reset: () =>
    set({
      phone: '',
      password: '',
      code: '',
      newPassword: '',
      repeatNewPassword: '',
    }),
}));