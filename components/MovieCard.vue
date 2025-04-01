<template>
  <article class="w-full cursor-pointer overflow-hidden rounded-lg">
    <NuxtLink :to="getDetailUrl">
      <div class="relative overflow-hidden lg:h-[380px] xl:h-[450px]">
        <NuxtImg v-if="posterPath" :src="posterPath" :alt="title" class="h-full w-full object-cover transition-transform duration-500 hover:scale-105" placeholder />
        <NuxtImg v-else-if="profilePath" :src="profilePath" :alt="name" class="h-full w-full object-cover transition-transform duration-500 hover:scale-105" placeholder />
        <div v-else class="flex h-full w-full items-center justify-center bg-gray-800 text-sm text-gray-500">No Image</div>
        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
          <div class="inline-flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-sm font-bold text-white">
            <Icon name="material-symbols:star" size="16" class="text-yellow-500" />
            <span v-if="averageRating">{{ averageRating.toFixed(1) }}</span>
            <span v-else-if="popularity">{{ popularity.toFixed(1) }}</span>
          </div>
        </div>
      </div>

      <div class="py-3 text-left">
        <h3 v-if="title" class="m-0 truncate text-base font-semibold text-white">{{ title }}</h3>
        <h3 v-else-if="name" class="m-0 truncate text-base font-semibold text-white">{{ name }}</h3>
        <p v-if="releaseDate" class="mt-1 text-sm text-gray-400">{{ releaseDate ? releaseDate : "N/A" }}</p>
        <p v-else-if="firstAirDate" class="mt-1 text-sm text-gray-400">{{ firstAirDate ? firstAirDate : "N/A" }}</p>
        <p v-else class="mt-1 text-sm text-gray-400">{{ mediaType === "person" ? "Person" : "N/A" }}</p>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  posterPath: {
    type: String,
    required: false,
    default: "",
  },
  profilePath: {
    type: String,
    required: false,
    default: "",
  },
  releaseDate: {
    type: String,
    required: false,
    default: "",
  },
  firstAirDate: {
    type: String,
    required: false,
    default: "",
  },
  averageRating: {
    type: Number,
    required: false,
    default: 0,
  },
  popularity: {
    type: Number,
    required: false,
    default: 0,
  },
  id: {
    type: Number,
    required: false,
    default: 0,
  },
  mediaType: {
    type: String,
    required: false,
    default: "",
  },
});

const getDetailUrl = computed(() => {
  if (!props.id) return "/";

  if (props.mediaType) return `/${props.mediaType}/${props.id}`;

  if (props.title) return `/movie/${props.id}`;
  if (props.name && props.firstAirDate) return `/tv/${props.id}`;
  if (props.name && props.profilePath) return `/person/${props.id}`;

  return `/movie/${props.id}`;
});
</script>
