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
  results: {
    name: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
    id: number;
    media_type: string;
  }[];
}

const config = useRuntimeConfig();
const imageBaseUrl = ref("https://image.tmdb.org/t/p/w500");

const { data: trendingTVShowsResponse } = await useFetch<TrendingTVShows>("https://api.themoviedb.org/3/trending/tv/week?language=en-US", {
  headers: {
    Authorization: `Bearer ${config.public.TMDB_API_KEY}`,
  },
});

const trendingTVShows = computed(() => trendingTVShowsResponse.value?.results || []);

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
