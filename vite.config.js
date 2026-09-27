import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  
})
// export default {
//   darkMode: 'class',   // 👈 required
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: { extend: {} },
//   plugins: [],
// };