// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),],
// })



import { defineConfig,loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), 'VITE_');
console.log(env)
  return{
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      port:  Number(env.VITE_PORT), 
      host:true,
      strictPort: true,
      historyApiFallback: true,
      // allowedHosts:[
      //   "localhost",
      //   "admin.gautamsolar.us"
      // ]
    }
  }
})