<template>
  <div class="bg-base-300">
    <header class="mx-auto max-w-7xl">
      <nav class="navbar items-center justify-between">
        <p class="text-xl font-bold">CineVault</p>
        <ul class="flex items-center space-x-4">
          <li v-for="link in navLinks" :key="link.name">
            <NuxtLink :to="link.url" class="link hover:bg-primary rounded px-3 py-2 no-underline transition-colors">
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script setup lang="ts">
const navLinks = ref([
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Movies",
    url: "/movie",
  },
  {
    name: "TV Shows",
    url: "/tv",
  },
]);
</script>

<style scoped></style>
