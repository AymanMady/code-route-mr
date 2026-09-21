import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Public path. Racine par défaut (Vercel, Cloudflare Pages, Netlify).
// Pour un déploiement en sous-dossier (GitHub Pages projet) :
//   VITE_BASE=/mon-repo/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
});
