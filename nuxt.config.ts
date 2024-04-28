// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts", "@nuxt/ui", "@pinia/nuxt"],
  googleFonts: {
    families: {
      Poppins: [100,200,300,400,500,700]
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
  runtimeConfig: {
    apiKey: '8e832907917b59ca36ac1406c0ced35e'
  }
});
