import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet l'accès depuis d'autres appareils
    port: 5173, // Port par défaut
    strictPort: false, // Utilise un autre port si 5173 est occupé
    open: false, // Ne pas ouvrir automatiquement le navigateur
  },
})
