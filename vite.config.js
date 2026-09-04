// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),],
// })



<<<<<<< HEAD
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  console.log(env)
  return {
=======
import { defineConfig,loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), 'VITE_');
console.log(env)
  return{
>>>>>>> 352d9880bf0c20182ddcee5ee40b10c732eeb56b
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
<<<<<<< HEAD
      port: Number(env.VITE_PORT) || 3002,
      host: true,
=======
      port:  Number(env.VITE_PORT), 
      host:true,
>>>>>>> 352d9880bf0c20182ddcee5ee40b10c732eeb56b
      strictPort: true,
      historyApiFallback: true,
      // allowedHosts:[
      //   "localhost",
      //   "admin.gautamsolar.us"
      // ]
    }
  }
})