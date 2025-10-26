// File: client/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // This is the new part you must add:
  server: {
    proxy: {
      // This forwards all requests starting with /api
      // to your backend server on http://localhost:5000
      '/api': 'http://localhost:5000'
    }
  }
})