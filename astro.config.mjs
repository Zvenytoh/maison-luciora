import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://maison-luciora.mehdiennajehfr.chatgpt.site',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  image: { responsiveStyles: true },
  devToolbar: { enabled: false },
});
