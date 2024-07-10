import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  isLogin: boolean;
  userId: null | number;
  nickname: null | string;
  accessToken: null | string;
}

interface AuthAction {
  actions: {
    login: (userId: number, nickname: string, accessToken: string) => Promise<void>;
    logout: () => void;
  };
}

export const initialState: AuthState = {
  isLogin: false,
  userId: null,
  nickname: null,
  accessToken: null,
};

export const useAuthStore = create<AuthState & AuthAction>()(
  immer(
    persist(
      (set) => ({
        ...initialState,
        actions: {
          login: async (userId, nickname, accessToken) => set(() => ({ isLogin: true, userId, nickname, accessToken })),
          logout: () => {
            set(() => ({ isLogin: false, userId: null, nickname: null, accessToken: null }));
            localStorage.removeItem("auth");
          },
        },
      }),
      { name: "auth" },
    ),
  ),
);

export const useAuthActions = () => useAuthStore((state) => state.actions);
