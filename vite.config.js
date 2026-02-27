import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Set base to your GitHub repo name, e.g. '/leadership-view/'
export default defineConfig({
  plugins: [react()],
  base: '/leadershipviewtemplate/',
})
