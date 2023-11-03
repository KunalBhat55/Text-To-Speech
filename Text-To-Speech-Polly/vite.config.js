import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/ConvertToSpeech": "http://localhost:3000",
      "/api/getAudio": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
