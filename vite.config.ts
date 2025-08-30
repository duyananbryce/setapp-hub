import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [
      react(),
      tsconfigPaths()
    ],
    base: isProduction ? '/setapp-apps-showcase-modern/' : '/',
    esbuild: {
      // 在快速构建模式下跳过类型检查
      target: 'es2020',
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    }
  }
})