<template>
  <header class="bg-base-300">
    <div class="mx-auto max-w-7xl">
      <nav class="navbar items-center justify-between px-4 xl:px-0">
        <p class="text-xl font-bold">CineVault</p>

        <ul class="hidden items-center space-x-4 sm:flex">
          <li v-for="link in navLinks" :key="link.name">
            <NuxtLink :to="link.url" class="link hover:bg-primary rounded px-3 py-2 no-underline transition-colors">
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>

        <button class="flex items-center focus:outline-none sm:hidden" aria-label="Toggle navigation menu" @click="isMenuOpen = !isMenuOpen">
          <Icon v-if="!isMenuOpen" name="heroicons:bars-3" size="24" />
          <Icon v-else name="heroicons:x-mark" size="24" />
        </button>
      </nav>

      <div v-show="isMenuOpen" class="sm:hidden">
        <ul class="flex flex-col space-y-2 px-2 py-4">
          <li v-for="link in navLinks" :key="link.name" class="flex items-center px-3 py-2">
            <Icon :name="link.icon" size="18" class="mr-3 inline-block" />
            <NuxtLink :to="link.url" class="hover:bg-primary block rounded no-underline transition-colors" @click="isMenuOpen = false">
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false);
const navLinks = ref([
  {
    name: "Home",
    url: "/",
    icon: "material-symbols:house-rounded",
  },
  {
    name: "Movies",
    url: "/movie",
    icon: "material-symbols:movie-sharp",
  },
  {
    name: "TV Shows",
    url: "/tv",
    icon: "material-symbols:live-tv",
  },
]);
</script>

<style scoped></style>
