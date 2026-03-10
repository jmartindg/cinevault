import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/icon", "@nuxt/fonts", "@nuxt/eslint", "nuxt-splide"],
  nitro: {
    preset: "cloudflare-pages",
  },
  app: {
    head: {
      title: "CineVault",
      meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { name: "description", content: "Your ultimate movie & tv shows archive" }],
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.svg",
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
  css: ["~/assets/app.css"],
  image: {
    domains: ["image.tmdb.org"],
    format: ["webp"],
  },
  runtimeConfig: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  splide: {
    theme: "default",
  },
});
