<template>
  <section class="mx-auto max-w-7xl px-4 py-8 sm:py-12 xl:px-0">
    <h2 class="flex items-center gap-2 pb-6 text-xl font-semibold"><Icon name="material-symbols:live-tv" size="24" />Popular TV Shows</h2>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <section v-for="popularTVShow in popularTVShows" :key="popularTVShow.id">
        <MovieCard
          :id="popularTVShow.id"
          :name="popularTVShow.name"
          :average-rating="popularTVShow.vote_average"
          :poster-path="getPosterUrl(popularTVShow.poster_path)"
          :first-air-date="formatReleaseDate(popularTVShow.first_air_date)"
          media-type="tv"
        />
      </section>
    </div>

    <div v-if="totalPages > 0" class="mt-8 flex justify-center">
      <div class="flex items-center gap-4">
        <button
          :disabled="page === 1"
          class="rounded px-4 py-2 text-sm font-medium text-white transition-colors"
          :class="page === 1 ? 'cursor-not-allowed bg-gray-400' : 'bg-primary hover:bg-primary/80 cursor-pointer'"
          @click="changePage(page - 1)"
        >
          <span class="flex items-center gap-1">
            <Icon name="material-symbols:arrow-back-ios" size="14" />
            Previous
          </span>
        </button>

        <span class="text-sm">
          Page {{ page }} of {{ totalPages }}
          <span class="ml-2 text-xs text-gray-500">({{ totalResults }} results)</span>
        </span>

        <button
          :disabled="page === totalPages"
          class="rounded px-4 py-2 text-sm font-medium text-white transition-colors"
          :class="page === totalPages ? 'cursor-not-allowed bg-gray-400' : 'bg-primary hover:bg-primary/80 cursor-pointer'"
          @click="changePage(page + 1)"
        >
          <span class="flex items-center gap-1">
            Next
            <Icon name="material-symbols:arrow-forward-ios" size="14" />
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PopularTVShows {
  name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  id: number;
  media_type: string;
}

interface Results {
  results: PopularTVShows[];
  page: number;
  total_pages: number;
  total_results: number;
}

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const popularTVShows = ref<PopularTVShows[]>([]);
const page = ref(parseInt(route.query.page as string) || 1);
const loading = ref(true);
const error = ref(null as string | null);
const imageBaseUrl = ref("https://image.tmdb.org/t/p/w500");
const totalPages = ref(0);
const totalResults = ref(0);

onMounted(() => {
  if (!route.query.page) {
    router.push({ query: { ...route.query, page: 1 } });
  }
  getPopularTVShows();
});

watch(
  () => route.query.page,
  (newPage) => {
    if (newPage && parseInt(newPage as string) !== page.value) {
      page.value = parseInt(newPage as string) || 1;
      getPopularTVShows();
    }
  },
);

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

const getPopularTVShows = async () => {
  try {
    loading.value = true;
    const token = config.public.TMDB_API_KEY;
    const res: Results = await $fetch(`https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=${page.value}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    popularTVShows.value = res.results;
    totalPages.value = res.total_pages || 0;
    totalResults.value = res.total_results || 0;
  } catch (err) {
    console.error(err);
    error.value = "Failed to fetch popular TV shows.";
  } finally {
    loading.value = false;
  }
};

const changePage = async (newPage: number) => {
  if (newPage < 1 || newPage > totalPages.value) return;

  await router.push({
    query: {
      ...route.query,
      page: newPage,
    },
  });

  page.value = newPage;
  await getPopularTVShows();

  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped></style>
