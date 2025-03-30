<template>
  <div>
    <div class="hero-section py-12 md:py-16" :style="backdropStyle">
      <div class="overlay" />
      <section class="relative z-10 mx-auto max-w-7xl px-2 py-8 sm:py-12">
        <section class="grid gap-8 md:grid-cols-12">
          <section class="md:col-span-4 lg:col-span-3">
            <NuxtImg
              :src="getPosterUrl(movieDetails?.poster_path)"
              :alt="movieDetails?.title"
              class="w-full rounded-lg shadow-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
              width="300"
              height="450"
            />
          </section>
          <article class="flex flex-col justify-start md:col-span-8 lg:col-span-9">
            <h2 class="text-2xl font-bold sm:text-3xl">{{ movieDetails?.title }}</h2>
            <h3 class="py-3 italic">{{ movieDetails?.tagline }}</h3>
            <div class="inline-flex w-fit items-center gap-1 rounded bg-black/60 px-2 py-1 text-sm">
              <Icon name="material-symbols:star" size="16" class="text-yellow-500" /> <span class="font-medium">{{ movieDetails?.vote_average.toFixed(1) }}</span>
            </div>
            <p class="mt-4">{{ movieDetails?.overview }}</p>
            <div class="my-4 grid gap-1 sm:grid-cols-2">
              <ul class="space-y-1">
                <li class="font-light"><span class="font-semibold">Runtime:</span> {{ movieDetails?.runtime }} minutes</li>
                <li class="font-light"><span class="font-semibold">Release Date:</span> {{ formatReleaseDate(movieDetails?.release_date) }}</li>
                <li class="font-light"><span class="font-semibold">Status:</span> {{ movieDetails?.status }}</li>
              </ul>
              <ul class="space-y-1">
                <li class="font-light">
                  <span class="font-semibold">Languages: </span>
                  <span v-for="(language, index) in movieDetails?.spoken_languages" :key="language.iso_639_1">
                    {{ language.english_name }}<span v-if="index < (movieDetails?.spoken_languages?.length ?? 0) - 1">, </span>
                  </span>
                </li>
                <li class="font-light">
                  <span class="font-semibold">Production: </span>
                  <span v-for="(production, index) in movieDetails?.production_companies" :key="production.id">
                    {{ production.name }}<span v-if="index < (movieDetails?.production_companies?.length ?? 0) - 1">, </span>
                  </span>
                </li>
                <li class="font-light">
                  <span class="font-semibold">{{ (movieDetails?.production_countries?.length ?? 0) === 1 ? "Production Country: " : "Production Countries: " }} </span>
                  <span v-for="(production, index) in movieDetails?.production_countries" :key="production.iso_3166_1">
                    {{ production.name }}<span v-if="index < (movieDetails?.production_countries?.length ?? 0) - 1">, </span>
                  </span>
                </li>
              </ul>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="genre in movieDetails?.genres" :key="genre.id" class="rounded bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700">{{ genre.name }}</span>
            </div>
          </article>
        </section>
      </section>
    </div>

    <section class="mx-auto max-w-7xl px-2 py-8 sm:py-12">
      <h3 class="flex items-center gap-2 pb-6 text-2xl font-bold"><Icon name="material-symbols:person-rounded" size="24" /> Cast</h3>

      <!-- Mobile horizontal scroll for small screens -->
      <article class="lg:hidden">
        <div class="no-scrollbar -mx-2 flex snap-x snap-mandatory overflow-x-auto px-2 pb-4">
          <NuxtLink
            v-for="cast in movieDetails?.credits?.cast"
            :key="cast.id"
            :to="`/person/${cast.id}`"
            class="mr-3 flex w-32 shrink-0 snap-start flex-col items-center rounded-lg p-3 transition-transform hover:scale-105"
          >
            <div class="relative mb-2 h-24 w-24 overflow-hidden rounded-full shadow-md">
              <NuxtImg v-if="cast.profile_path" :src="getPosterUrl(cast.profile_path)" :alt="cast.name" class="h-full w-full object-cover" width="96" height="96" placeholder />
              <div v-else class="flex h-full w-full items-center justify-center bg-gray-200 text-lg text-gray-500">
                {{ cast.name.charAt(0) }}
              </div>
            </div>
            <h4 class="line-clamp-1 text-center text-sm font-semibold">{{ cast.name }}</h4>
            <p class="text-neutral-content line-clamp-1 pt-1 text-center text-xs">{{ cast.character }}</p>
          </NuxtLink>
        </div>
      </article>

      <!-- Grid layout for larger screens -->
      <article class="hidden lg:block">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <NuxtLink v-for="cast in displayedCast" :key="cast.id" :to="`/person/${cast.id}`" class="flex flex-col items-center rounded-lg p-3 transition-all hover:shadow-md">
            <div class="relative mb-2 h-28 w-28 overflow-hidden rounded-full shadow-md md:h-32 md:w-32">
              <NuxtImg v-if="cast.profile_path" :src="getPosterUrl(cast.profile_path)" :alt="cast.name" class="h-full w-full object-cover" width="128" height="128" placeholder />
              <div v-else class="flex h-full w-full items-center justify-center bg-gray-200 text-2xl text-gray-500">
                {{ cast.name.charAt(0) }}
              </div>
            </div>
            <h4 class="line-clamp-1 text-center text-sm font-semibold">{{ cast.name }}</h4>
            <p class="text-neutral-content line-clamp-1 pt-1 text-center text-xs">{{ cast.character }}</p>
          </NuxtLink>
        </div>
      </article>

      <section class="mt-6 hidden items-center justify-center lg:flex">
        <div class="flex space-x-2">
          <button v-if="displayCount > 10" class="hover:bg-base-200 flex cursor-pointer items-center rounded-full px-3 py-1 text-sm transition-colors" @click="showLess">
            <Icon name="heroicons:chevron-up" class="mr-1" size="16" />
            Show Less
          </button>
          <button
            v-if="displayCount < (movieDetails?.credits?.cast?.length || 0)"
            class="hover:bg-base-200 flex cursor-pointer items-center rounded-full px-3 py-1 text-sm transition-colors"
            @click="showMore"
          >
            <Icon name="heroicons:chevron-down" class="mr-1" size="16" />
            Show More
          </button>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
interface MovieDetails {
  title: string;
  tagline: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  id: number;
  overview: string;
  media_type: string;
  genres: Genre[];
  runtime: number;
  status: string;
  spoken_languages: SpokenLanguage[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  credits: {
    cast: MovieCast[];
    crew: CrewMember[];
  };
}

interface Genre {
  id: number;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface MovieCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

const route = useRoute();
const config = useRuntimeConfig();
const imageBaseUrl = ref("https://image.tmdb.org/t/p/w500");
const backdropBaseUrl = ref("https://image.tmdb.org/t/p/original");
const displayCount = ref(10);

const backdropStyle = computed(() => {
  const url = getBackdropUrl(movieDetails.value?.backdrop_path);
  return url
    ? {
        backgroundImage: `url(${url})`,
      }
    : {};
});

const displayedCast = computed(() => {
  return movieDetails.value?.credits?.cast?.slice(0, displayCount.value) || [];
});

const showMore = () => {
  const totalCast = movieDetails.value?.credits?.cast?.length || 0;
  displayCount.value = Math.min(displayCount.value + 10, totalCast);
};

const showLess = () => {
  displayCount.value = Math.max(displayCount.value - 10, 10);
};

const getBackdropUrl = (backdropPath?: string) => {
  if (!backdropPath) return undefined;
  return `${backdropBaseUrl.value}${backdropPath}`;
};

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

const { data: movieDetails } = await useFetch<MovieDetails>(`https://api.themoviedb.org/3/movie/${route.params.id}?language=en-US&append_to_response=credits`, {
  headers: {
    Authorization: `Bearer ${config.public.TMDB_API_KEY}`,
  },
});
</script>

<style scoped>
.hero-section {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 500px;
  display: flex;
  align-items: center;
  background-color: #1a1a2e;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
  z-index: 1;
}
</style>
