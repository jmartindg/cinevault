<template>
  <section class="mx-auto max-w-7xl px-2 pb-8 sm:pb-12">
    <h2 class="flex items-center gap-2 pb-6 text-xl font-semibold"><Icon name="material-symbols:live-tv" size="24" />Trending TV Shows</h2>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <section v-for="trendingTVShow in trendingTVShows" :key="trendingTVShow.id">
        <MovieCard
          :id="trendingTVShow.id"
          :title="trendingTVShow.name"
          :average-rating="trendingTVShow.vote_average"
          :poster-path="getPosterUrl(trendingTVShow.poster_path)"
          :release-date="formatReleaseDate(trendingTVShow.first_air_date)"
          :media-type="trendingTVShow.media_type"
        />
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TrendingTVShows {
  name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  id: number;
  media_type: string;
}

interface Results {
  results: TrendingTVShows[];
}

const config = useRuntimeConfig();
const trendingTVShows = ref<TrendingTVShows[]>([]);
const loading = ref(true);
const error = ref(null as string | null);
const imageBaseUrl = ref("https://image.tmdb.org/t/p/w500");

onMounted(() => {
  getTrendingTrendingTVShows();
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

const getTrendingTrendingTVShows = async () => {
  try {
    loading.value = true;
    const token = config.public.TMDB_API_KEY;
    const res: Results = await $fetch("https://api.themoviedb.org/3/trending/tv/week?language=en-US", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    trendingTVShows.value = res.results;
  } catch (err) {
    console.error(err);
    error.value = "Failed to fetch trending TV Shows";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
