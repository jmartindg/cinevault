<template>
  <div>
    <div class="hero-section py-12 md:py-16" :style="backdropStyle">
      <div class="overlay" />
      <section class="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:py-12 xl:px-0">
        <section class="grid gap-8 md:grid-cols-12">
          <section class="md:col-span-4 lg:col-span-3">
            <NuxtImg
              :src="getPosterUrl(tvShowDetails?.poster_path)"
              :alt="tvShowDetails?.name"
              class="w-full rounded-lg shadow-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
              width="300"
              height="450"
              :placeholder="[300, 450]"
            />
          </section>
          <article class="flex flex-col justify-start md:col-span-8 lg:col-span-9">
            <h2 class="text-2xl font-bold sm:text-3xl">{{ tvShowDetails?.name }}</h2>
            <h3 class="py-3 italic">{{ tvShowDetails?.tagline }}</h3>
            <div class="inline-flex w-fit items-center gap-1 rounded bg-black/60 px-2 py-1 text-sm">
              <Icon name="material-symbols:star" size="16" class="text-yellow-500" /> <span class="font-medium">{{ tvShowDetails?.vote_average.toFixed(1) }}</span>
            </div>
            <p class="mt-4">{{ tvShowDetails?.overview }}</p>
            <div class="my-4 grid gap-1 sm:grid-cols-2">
              <ul class="space-y-1">
                <li v-if="tvShowDetails?.runtime" class="font-light"><span class="font-semibold">Runtime:</span> {{ tvShowDetails?.runtime }} minutes</li>
                <li v-if="tvShowDetails?.first_air_date" class="font-light"><span class="font-semibold">Release Date:</span> {{ formatReleaseDate(tvShowDetails?.first_air_date) }}</li>
                <li v-if="tvShowDetails?.status" class="font-light"><span class="font-semibold">Status:</span> {{ tvShowDetails?.status }}</li>
              </ul>
              <ul class="space-y-1">
                <li v-if="tvShowDetails?.spoken_languages.length" class="font-light">
                  <span class="font-semibold">Languages: </span>
                  <span v-for="(language, index) in tvShowDetails?.spoken_languages" :key="language.iso_639_1">
                    {{ language.english_name }}<span v-if="index < (tvShowDetails?.spoken_languages?.length ?? 0) - 1">, </span>
                  </span>
                </li>
                <li v-if="tvShowDetails?.production_companies.length" class="font-light">
                  <span class="font-semibold">Production: </span>
                  <span v-for="(production, index) in tvShowDetails?.production_companies" :key="production.id">
                    {{ production.name }}<span v-if="index < (tvShowDetails?.production_companies?.length ?? 0) - 1">, </span>
                  </span>
                </li>
                <li v-if="tvShowDetails?.production_countries.length" class="font-light">
                  <span class="font-semibold">{{ (tvShowDetails?.production_countries?.length ?? 0) === 1 ? "Production Country: " : "Production Countries: " }} </span>
                  <span v-for="(production, index) in tvShowDetails?.production_countries" :key="production.iso_3166_1">
                    {{ production.name }}<span v-if="index < (tvShowDetails?.production_countries?.length ?? 0) - 1">, </span>
                  </span>
                </li>
              </ul>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="genre in tvShowDetails?.genres" :key="genre.id" class="rounded bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700">{{ genre.name }}</span>
            </div>
          </article>
        </section>
      </section>
    </div>

    <section class="mx-auto max-w-7xl px-4 py-8 sm:py-12 xl:px-0">
      <h3 class="flex items-center gap-2 pb-6 text-2xl font-bold"><Icon name="material-symbols:person-rounded" size="24" /> Cast</h3>

      <Splide
        v-if="tvShowDetails?.credits?.cast.length"
        :options="{
          perPage: 5,
          perMove: 1,
          breakpoints: {
            320: {
              perPage: 2,
            },
            640: {
              perPage: 3,
            },
            768: {
              perPage: 4,
            },
            1024: {
              perPage: 4,
            },
          },
          pagination: false,
          gap: 14,
          lazyLoad: true,
        }"
        aria-labelledby="cast"
      >
        <SplideSlide v-for="cast in tvShowDetails?.credits?.cast" :key="cast.id" class="flex flex-col items-center overflow-hidden">
          <div class="mb-2">
            <div class="overflow-hidden rounded-lg transition-all duration-300">
              <NuxtImg
                :src="cast.profile_path ? getPosterUrl(cast.profile_path) : '/images/no-image-placeholder.png'"
                :alt="cast.name"
                class="rounded-lg object-cover transition-transform duration-300 hover:scale-110"
                format="webp"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
                width="400"
                height="550"
                :placeholder="[400, 550]"
              />
            </div>
          </div>
          <div class="py-2">
            <h4 class="line-clamp-1 text-center text-sm font-semibold">{{ cast.name }}</h4>
            <p class="text-neutral-content line-clamp-1 pt-1 text-center text-xs">{{ cast.character }}</p>
          </div>
        </SplideSlide>
      </Splide>

      <p v-else class="text-base-content py-12 text-center text-sm">No cast available.</p>

      <h3 class="flex items-center gap-2 pt-6 pb-3 text-2xl font-bold"><Icon name="material-symbols:movie-sharp" size="24" /> Reviews</h3>

      <article>
        <ul v-if="reviews?.results.length" class="list bg-base-100 rounded-box">
          <li v-for="review in reviews?.results" :key="review.id" class="list-row px-0 py-4">
            <NuxtImg
              class="rounded-box size-12 object-cover"
              width="120"
              height="120"
              :placeholder="[120, 120]"
              :alt="review.author"
              :src="review.author_details?.avatar_path ? getPosterUrl(review.author_details.avatar_path) : '/images/no-image-placeholder.png'"
            />
            <div>
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                  <h4 class="text-base font-semibold">{{ review.author }}</h4>
                  <div v-if="review.author_details.rating" class="inline-flex w-fit items-center gap-1 rounded bg-black/60 px-2 py-1 text-sm">
                    <Icon name="material-symbols:star" size="16" class="text-yellow-500" /> <span class="font-medium">{{ review.author_details.rating }}</span>
                  </div>
                  <div v-else class="inline-flex w-fit items-center gap-1 rounded bg-black/60 px-2 py-1 text-sm">
                    <Icon name="material-symbols:star" size="16" class="text-yellow-500" /> <span class="font-medium">No review</span>
                  </div>
                </div>
                <p class="text-base-content text-sm">{{ formatReleaseDate(review.created_at) }}</p>
              </div>
              <p class="text-base-content pt-2 text-xs sm:pt-1">{{ review.author_details.username ? review.author_details.username : "N/A" }}</p>
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="list-col-wrap text-sm leading-6" v-html="review.content" />
          </li>
        </ul>

        <p v-else class="text-base-content py-12 text-center text-sm">No reviews available.</p>
      </article>

      <h3 class="flex items-center gap-2 py-6 text-2xl font-bold"><Icon name="material-symbols:movie-sharp" size="24" /> You may also like</h3>

      <Splide
        v-if="similarTvShows?.results.length"
        :options="{
          perPage: 4,
          perMove: 1,
          breakpoints: {
            320: {
              perPage: 2,
            },
            640: {
              perPage: 3,
            },
            768: {
              perPage: 4,
            },
            1024: {
              perPage: 4,
            },
          },
          pagination: false,
          gap: 14,
          lazyLoad: true,
        }"
        aria-labelledby="cast"
      >
        <SplideSlide v-for="similar in similarTvShows?.results || []" :key="similar.id" class="flex flex-col items-center overflow-hidden">
          <MovieCard
            :id="similar.id"
            :name="similar.name"
            :poster-path="getPosterUrl(similar.poster_path)"
            :release-date="formatReleaseDate(similar.first_air_date)"
            :average-rating="similar.vote_average"
            media-type="tv"
          />
        </SplideSlide>
      </Splide>

      <p v-else class="text-base-content py-12 text-center text-sm">No similar TV shows available.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
interface TvShowDetails {
  name: string;
  tagline: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
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
    cast: TvShowCast[];
  };
}

interface SimilarTVShowsResponse {
  results: {
    id: number;
    name: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
    media_type?: string;
    genres?: Genre[];
  }[];
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

interface TvShowCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface TvShowsReviews {
  results: {
    id: string;
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path?: string | null;
      rating: number | null;
    };
    content: string;
    created_at: string;
  }[];
}

const route = useRoute();
const config = useRuntimeConfig();
const imageBaseUrl = ref("https://image.tmdb.org/t/p/w500");
const backdropBaseUrl = ref("https://image.tmdb.org/t/p/original");

const backdropStyle = computed(() => {
  const url = getBackdropUrl(tvShowDetails.value?.backdrop_path);
  return url
    ? {
        backgroundImage: `url(${url})`,
      }
    : {};
});

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

const { data: tvShowDetails } = await useFetch<TvShowDetails>(`https://api.themoviedb.org/3/tv/${route.params.id}?language=en-US&append_to_response=credits`, {
  headers: {
    Authorization: `Bearer ${config.public.TMDB_API_KEY}`,
  },
});

const { data: similarTvShows } = await useFetch<SimilarTVShowsResponse>(`https://api.themoviedb.org/3/tv/${route.params.id}/similar?language=en-US&page=1`, {
  headers: {
    Authorization: `Bearer ${config.public.TMDB_API_KEY}`,
  },
});

const { data: reviews } = await useFetch<TvShowsReviews>(`https://api.themoviedb.org/3/tv/${route.params.id}/reviews?language=en-US&page=1`, {
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
