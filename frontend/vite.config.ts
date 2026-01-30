import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { defineConfig, loadEnv, UserConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// learn how to configure at https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), svgr()],
    server: {
      host: env.ENV_SERVER,
      port: parseInt(env.ENV_PORT) || 3000,
      strictPort: true,
      open: true
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@assets': resolve(__dirname, './src/assets'),
        '@components': resolve(__dirname, './src/components'),
        '@constants': resolve(__dirname, './src/constants'),
        '@containers': resolve(__dirname, './src/containers'),
        '@contexts': resolve(__dirname, './src/contexts'),
        '@helpers': resolve(__dirname, './src/helpers'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@languages': resolve(__dirname, './src/languages'),
        '@layouts': resolve(__dirname, './src/layouts'),
        '@middlewares': resolve(__dirname, './src/middlewares'),
        '@pages': resolve(__dirname, './src/pages'),
        '@routers': resolve(__dirname, './src/routers'),
        '@services': resolve(__dirname, './src/services'),
        '@stores': resolve(__dirname, './src/stores'),
        '@wrappers': resolve(__dirname, './src/wrappers')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@assets/styles/_variables.scss";' +
            '@import "@assets/styles/_mixins.scss";' +
            '@import "@assets/styles/_functions.scss";'
        }
      }
    },
    build: {
      outDir: 'build'
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: false,
            process: true
          }),
          NodeModulesPolyfillPlugin()
        ],
        target: 'es2020',
        treeShaking: true
      }
    },
    envPrefix: 'ENV_'
  }
})
