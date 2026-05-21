"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "@gravity-ui/icons";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center w-7 h-7 rounded-xl border border-[#04f2c268] transition"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-white" />
      ) : (
        <Moon className="w-4 h-4 " />
      )}
    </button>
  );
};

export default ThemeToggle;