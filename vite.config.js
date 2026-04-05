import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Recharts imports react-is; ensure both are pre-bundled together (avoids stale .vite cache issues).
  optimizeDeps: {
    include: ['recharts', 'react-is'],
  },
})
