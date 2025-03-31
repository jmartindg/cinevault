import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/icon", "@nuxt/fonts", "@nuxt/eslint", "nuxt-splide"],
  app: {
    head: {
      title: "CineVault",
      meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { name: "description", content: "Your ultimate movie & tv shows archive" }],
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/app.css"],
  image: {
    domains: ["image.tmdb.org"],
    formats: ["webp"],
  },
  runtimeConfig: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    public: {
      TMDB_API_KEY: process.env.TMDB_API_KEY,
    },
  },
  splide: {
    theme: "default",
  },
});
