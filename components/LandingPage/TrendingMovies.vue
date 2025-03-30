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
interface TrendingMovie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  id: number;
  media_type: string;
}

interface Results {
  results: TrendingMovie[];
}

const config = useRuntimeConfig();
const trendingMovies = ref<TrendingMovie[]>([]);
const loading = ref(true);
const error = ref(null as string | null);
const imageBaseUrl = ref("https://image.tmdb.org/t/p/w500");

onMounted(() => {
  getTrendingMovies();
});

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

const getTrendingMovies = async () => {
  try {
    loading.value = true;
    const token = config.public.TMDB_API_KEY;
    const res: Results = await $fetch("https://api.themoviedb.org/3/trending/movie/week?language=en-US", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    trendingMovies.value = res.results;
  } catch (err) {
    console.error(err);
    error.value = "Failed to fetch trending movies";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
