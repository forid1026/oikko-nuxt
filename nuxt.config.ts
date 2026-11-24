import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// content/projects/*.md থেকে প্রতিটি প্রকল্পের রাউট: prerender ও sitemap দুটোতেই লাগে
const projectRoutes = readdirSync('content/projects')
  .filter((f) => f.endsWith('.md'))
  .map((f) => `/projects/${f.replace(/\.md$/, '')}`)
const pageRoutes = ['/', '/about', '/projects', '/gallery', '/team', '/donate', '/contact']

// Nuxt 4: সোর্স কোড app/ ফোল্ডারে; content/, public/, server/ থাকে প্রজেক্টের রুটে।
export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/content', '@nuxtjs/sitemap'],

  css: ['~/assets/css/main.css'],

  // Tailwind CSS v4 — PostCSS নয়, সরাসরি Vite প্লাগিন
  vite: {
    plugins: [tailwindcss()],
  },

  // @nuxtjs/sitemap ও og:url-এর জন্য
  // TODO: ডোমেইন চূড়ান্ত হলে নিশ্চিত করুন
  site: {
    url: 'https://oikko-awo.com',
    name: 'ঐক্য',
    defaultLocale: 'bn',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'bn' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'ঐক্য — মানবতার পাশে, ২০১৫ থেকে',
      meta: [
        { name: 'theme-color', content: '#064F80' },
        { property: 'og:site_name', content: 'ঐক্য (Oikko)' },
        { property: 'og:locale', content: 'bn_BD' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        // TODO: public/logo.png ফাইলটি আপনাকে বসাতে হবে
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        // বাংলা অঙ্কের ছোট ফন্ট আগে থেকে লোড (শুধু ~৪ KB)
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/noto-bengali-digits.woff2', crossorigin: 'anonymous' },
      ],
    },
  },

  // বাংলা হরফ: শুধু Hind Siliguri। যে ওজনগুলো ব্যবহার হয়, ঠিক সেগুলোই লোড হয়; bengali ও latin দুই subset-ই আছে।
  fonts: {
    families: [
      { name: 'Hind Siliguri', provider: 'google', global: true, weights: [400, 500, 600, 700], styles: ['normal'], subsets: ['bengali', 'latin'] },
    ],
  },

  image: {
    format: ['webp'],
    quality: 80,
  },

  // /projects/[slug] পেজগুলো sitemap-এ যোগ করা (static রাউটগুলো আপনাআপনি আসে)
  sitemap: {
    urls: projectRoutes.map((loc) => ({ loc })),
    exclude: ['/404.html'],
  },

  // সম্পূর্ণ static সাইট: `npm run generate`
  nitro: {
    prerender: {
      crawlLinks: true, // /projects পেজের লিংক ধরে প্রতিটি /projects/<slug> তৈরি হবে
      failOnError: true,
      routes: [...pageRoutes, ...projectRoutes, '/404.html'],
    },
  },

  // /dev/font-test শুধু ডেভেলপমেন্টে যোগ হয় (NODE_ENV production হলে নয়, তাই generate-এ থাকে না)
  hooks: {
    'pages:extend'(pages) {
      if (process.env.NODE_ENV === 'production') return
      pages.push({
        name: 'dev-font-test',
        path: '/dev/font-test',
        file: fileURLToPath(new URL('./app/dev-pages/font-test.vue', import.meta.url)),
      })
    },
  },

  typescript: {
    strict: true,
    typeCheck: false, // `npm run typecheck` দিয়ে আলাদাভাবে চালান
  },
})
