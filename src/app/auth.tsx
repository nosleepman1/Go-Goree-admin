import { createContext, useContext } from "react";

export interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

