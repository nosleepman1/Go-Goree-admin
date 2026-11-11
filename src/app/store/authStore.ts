import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setTokenGetter, setUnauthorizedHandler } from "../api/laravelClient";

import { laravelClient } from "../api/laravelClient";

export interface AuthUser {
  id?: string;
  nom?: string;
  email?: string;
  role?: string;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

