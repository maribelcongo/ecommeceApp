import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Configuración de fragmentación manual
        manualChunks(id) {
          // Agrupa las dependencias de React en un chunk
          if (id.includes('node_modules/react')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }

          // Agrupar otras bibliotecas de node_modules en chunks
          if (id.includes('node_modules')) {
            // Agrupar por nombre de módulo
            return id.split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    // Ajustar el límite de tamaño de chunk si es necesario
    chunkSizeWarningLimit: 1000, // Ajusta según sea necesario
  }
});
