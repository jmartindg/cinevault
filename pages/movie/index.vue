<template>
  <section class="mx-auto max-w-7xl px-2 py-8 sm:py-12">
    <h2 class="flex items-center gap-2 pb-6 text-xl font-semibold"><Icon name="material-symbols:movie-sharp" size="24" />Popular Movies</h2>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <section v-for="trendingMovie in popularMovies" :key="trendingMovie.id">
        <MovieCard
          :id="trendingMovie.id"
          :title="trendingMovie.title"
          :average_rating="trendingMovie.vote_average"
          :poster_path="getPosterUrl(trendingMovie.poster_path)"
          :release_date="formatReleaseDate(trendingMovie.release_date)"
          :media_type="trendingMovie.media_type"
        />
      </section>
    </div>

    <div class="join mt-8 flex justify-center">
      <button @click="prevPage" class="join-item btn btn-primary">«</button>
      <button class="join-item btn">Page {{ page }}</button>
      <button @click="nextPage" class="join-item btn btn-primary">»</button>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PopularMovie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  id: number;
  media_type: string;
}

interface Results {
  results: PopularMovie[];
}

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const popularMovies = ref<PopularMovie[]>([]);
const page = ref(1);
const loading = ref(true);
const error = ref(null as string | null);
const imageBaseUrl = ref("https://image.tmdb.org/t/p/w500");

onMounted(() => {
  if (route.query.page) {
    page.value = parseInt(route.query.page as string) || 1;
  } else {
    router.push({ query: { ...route.query, page: 1 } });
  }
  getPopularMovies();
});

watch(
  () => route.query.page,
  (newPage) => {
    if (newPage && parseInt(newPage as string) !== page.value) {
      page.value = parseInt(newPage as string) || 1;
      getPopularMovies();
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

const getPopularMovies = async () => {
  try {
    loading.value = true;
    const token = config.public.TMDB_API_KEY;
    const res: Results = await $fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page.value}&region=PH`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    popularMovies.value = res.results;
  } catch (err) {
    console.error(err);
    error.value = "Failed to fetch popular movies";
  } finally {
    loading.value = false;
  }
};

const nextPage = async () => {
  const nextPageNum = page.value + 1;
  await router.push({ query: { ...route.query, page: nextPageNum } });
  page.value = nextPageNum;
  await getPopularMovies();
  window.scrollTo(0, 0);
};

const prevPage = async () => {
  if (page.value > 1) {
    const prevPageNum = page.value - 1;
    await router.push({ query: { ...route.query, page: prevPageNum } });
    page.value = prevPageNum;
    await getPopularMovies();
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped></style>
