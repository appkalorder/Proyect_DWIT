// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

<<<<<<< HEAD
  integrations: [react()]
=======
  
>>>>>>> 41b4705aac179114df8e7b4411947a5dad364bec
});