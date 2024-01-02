import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/locsearch': {
        target: 'https://geodata.gov.hk/gs/api/v1.0.0/locationSearch',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/locsearch/,''),
      }
    },
    port: 52580
  }
})
