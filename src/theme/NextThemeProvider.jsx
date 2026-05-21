"use client";
import { ThemeProvider } from 'next-themes';
import React from 'react';

const NextThemeProvider = ({ children }) => {
  return (
    <div>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </div>
  );
};

export default NextThemeProvider;