<template>
  <section class="mx-auto max-w-7xl px-4 py-8 sm:py-12 xl:px-0">
    <div v-if="personDetails" class="flex flex-col gap-8 md:flex-row">
      <div class="w-full flex-shrink-0 md:w-1/3">
        <div class="overflow-hidden rounded-lg shadow-lg">
          <NuxtImg
            v-if="personDetails.profile_path"
            :src="getPosterUrl(personDetails.profile_path)"
            :alt="personDetails.name"
            width="500"
            height="650"
            class="object-cover"
            :placeholder="[500, 650]"
          />
          <div v-else class="flex aspect-[2/3] items-center justify-center bg-gray-200">
            <span class="text-xl text-gray-400">No image available</span>
          </div>
        </div>
      </div>

      <div class="w-full md:w-2/3">
        <h1 class="mb-4 text-3xl font-bold md:text-4xl">{{ personDetails.name }}</h1>

        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div v-if="personDetails.birthday" class="border-primary border-l-4 pl-3">
            <h3 class="text-primary-content text-sm">Birthday</h3>
            <p class="text-neutral-content">{{ formatReleaseDate(personDetails.birthday) }}</p>
          </div>

          <div v-if="personDetails.deathday" class="border-accent border-l-4 pl-3">
            <h3 class="text-primary-content text-sm">Died</h3>
            <p class="text-neutral-content">{{ formatReleaseDate(personDetails.deathday) }}</p>
          </div>

          <div v-if="personDetails.place_of_birth" class="border-secondary border-l-4 pl-3">
            <h3 class="text-primary-content text-sm">Place of Birth</h3>
            <p class="text-neutral-content">{{ personDetails.place_of_birth }}</p>
          </div>

          <div class="border-warning border-l-4 pl-3">
            <h3 class="text-primary-content pb-1 text-sm">Popularity</h3>
            <p class="inline-flex w-fit items-center gap-1 rounded bg-black/60 px-2 py-1 text-sm">
              <Icon name="material-symbols:star" size="16" class="text-yellow-500" /> <span class="font-medium">{{ personDetails.popularity.toFixed(1) }}</span>
            </p>
          </div>
        </div>

        <div v-if="personDetails.biography">
          <h2 class="mb-3 text-xl font-semibold">Biography</h2>
          <p class="text-neutral-content leading-7 whitespace-pre-line">{{ personDetails.biography }}</p>
        </div>
        <div v-else class="text-gray-500 italic">No biography available.</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PersonDetails {
  id: number;
  name: string;
  profile_path: string | null;
  biography: string | null;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  popularity: number;
}

const route = useRoute();
const config = useRuntimeConfig();
const imageBaseUrl = ref("https://image.tmdb.org/t/p/w500");

const getPosterUrl = (posterPath?: string | null) => {
  if (!posterPath) return undefined;
  return `${imageBaseUrl.value}${posterPath}`;
};

const formatReleaseDate = (dateString: string | undefined): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const { data: personDetails } = await useFetch<PersonDetails>(`https://api.themoviedb.org/3/person/${route.params.id}?language=en-US`, {
  headers: {
    Authorization: `Bearer ${config.public.TMDB_API_KEY}`,
  },
});
</script>

<style scoped></style>
