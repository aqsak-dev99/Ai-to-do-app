import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Vercel serves the app from the root; GitHub Pages serves it from /Ai-to-do-app/
  base: process.env.VERCEL ? '/' : '/Ai-to-do-app/',
  publicDir: 'public'
});