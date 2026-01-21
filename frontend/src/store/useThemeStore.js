import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",

  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);

    // 🔥 THIS LINE FIXES EVERYTHING
    document.documentElement.setAttribute("data-theme", theme);

    set({ theme });
  },
}));
