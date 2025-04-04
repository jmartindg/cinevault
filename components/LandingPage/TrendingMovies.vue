<template>
  <section class="mx-auto max-w-7xl px-2 py-8 sm:py-12">
    <h2 class="flex items-center gap-2 pb-6 text-xl font-semibold"><Icon name="material-symbols:movie-sharp" size="24" />Trending Movies</h2>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <section v-for="trendingMovie in trendingMovies" :key="trendingMovie.id">
        <MovieCard
          :id="trendingMovie.id"
          :title="trendingMovie.title"
          :average-rating="trendingMovie.vote_average"
          :poster-path="getPosterUrl(trendingMovie.poster_path)"
          :release-date="formatReleaseDate(trendingMovie.release_date)"
          :media-type="trendingMovie.media_type"
        />
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TrendingMovieResponse {
  results: {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    release_date: string;
    media_type: string;
  }[];
}

const config = useRuntimeConfig();
const imageBaseUrl = ref("https://image.tmdb.org/t/p/w500");

const { data: trendingMoviesResponse } = await useFetch<TrendingMovieResponse>("https://api.themoviedb.org/3/trending/movie/week?language=en-US", {
  headers: {
    Authorization: `Bearer ${config.public.TMDB_API_KEY}`,
  },
});

const trendingMovies = computed(() => trendingMoviesResponse.value?.results || []);

const getPosterUrl = (posterPath: string) => {
  if (!posterPath) return undefined;
  return `${imageBaseUrl.value}${posterPath}`;
};

const formatReleaseDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
</script>

<style scoped></style>
