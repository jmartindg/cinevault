<template>
  <article class="w-full cursor-pointer overflow-hidden rounded-lg">
    <NuxtLink :to="`/${media_type}/${id}`">
      <div class="relative overflow-hidden lg:h-[380px] xl:h-[450px]">
        <NuxtImg v-if="poster_path" :src="poster_path" :alt="title" class="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        <div v-else class="flex h-full w-full items-center justify-center bg-gray-800 text-sm text-gray-500">No Image</div>
        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
          <div class="inline-flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-sm font-bold text-white">
            <Icon name="material-symbols:star" size="16" class="text-yellow-500" />
            <span>{{ average_rating.toFixed(1) }}</span>
          </div>
        </div>
      </div>

      <div class="py-3 text-left">
        <h3 class="m-0 truncate text-base font-semibold text-white">{{ title }}</h3>
        <p class="mt-1 text-sm text-gray-400">{{ release_date ? release_date : "N/A" }}</p>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  poster_path: {
    type: String,
    required: false,
    default: "",
  },
  release_date: {
    type: String,
    required: false,
    default: "",
  },
  average_rating: {
    type: Number,
    required: false,
    default: 0,
  },
  id: {
    type: Number,
    required: true,
    default: 0,
  },
  media_type: {
    type: String,
    required: false,
    default: "movie",
  },
});
</script>
