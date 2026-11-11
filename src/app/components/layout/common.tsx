import React from "react";

export const C = {
  // Aligné sur le bleu de la page de connexion de l'app client (Go-Goree-Clients,
  // src/constants/theme.ts : colors.primaryLight/primaryDark).
  ocean: "#0B5ED7",
  oceanDark: "#0B5ED7",
  teal: "#0BA5C0",
  green: "#0E9F6E",
  amber: "#D97706",
  purple: "#7C3AED",
  red: "#D42020",
  sidebarBg: "#FFFFFF",
  sidebarBorder: "#C2D3EE",
  sidebarActive: "linear-gradient(135deg, #4EA8DE, #0B5ED7)",
};

export function cn(...cls: (string | undefined | false | null)[]) {
  return cls.filter(Boolean).join(" ");
}

