<template>
  <section class="mx-auto max-w-7xl px-2 py-8 sm:py-12">
    <h2 class="flex items-center gap-2 pb-6 text-xl font-semibold"><Icon name="material-symbols:search-rounded" size="24" />Search Results for: {{ searchQuery }}</h2>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <section v-for="searchResult in searchResults" :key="searchResult.id">
        <MovieCard
          :id="searchResult.id"
          :title="searchResult.title"
          :name="searchResult.name"
          :average-rating="searchResult.vote_average"
          :popularity="searchResult.popularity"
          :poster-path="getPosterUrl(searchResult.poster_path)"
          :profile-path="getPosterUrl(searchResult.profile_path)"
          :release-date="formatReleaseDate(searchResult.release_date)"
          :first-air-date="formatReleaseDate(searchResult.first_air_date)"
          :media-type="searchResult.media_type"
        />
      </section>
    </div>

    <div v-if="totalPages > 0" class="mt-8 flex justify-center">
      <div class="flex items-center gap-4">
        <button
          :disabled="currentPage === 1"
          class="rounded px-4 py-2 text-sm font-medium text-white transition-colors"
          :class="currentPage === 1 ? 'cursor-not-allowed bg-gray-400' : 'bg-primary hover:bg-primary/80 cursor-pointer'"
          @click="changePage(currentPage - 1)"
        >
          <span class="flex items-center gap-1">
            <Icon name="material-symbols:arrow-back-ios" size="14" />
            Previous
          </span>
        </button>

        <span class="text-sm">
          Page {{ currentPage }} of {{ totalPages }}
          <span class="ml-2 text-xs text-gray-500">({{ totalResults }} results)</span>
        </span>

        <button
          :disabled="currentPage === totalPages"
          class="rounded px-4 py-2 text-sm font-medium text-white transition-colors"
          :class="currentPage === totalPages ? 'cursor-not-allowed bg-gray-400' : 'bg-primary hover:bg-primary/80 cursor-pointer'"
          @click="changePage(currentPage + 1)"
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
interface SearchResults {
  title: string;
  name: string;
  poster_path: string;
  profile_path: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  id: number;
  media_type: string;
}

interface Results {
  results: SearchResults[];
  page: number;
  total_pages: number;
  total_results: number;
}

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const imageBaseUrl = ref("https://image.tmdb.org/t/p/original");
const searchQuery = ref<string>((route.query.q as string) || "");
const searchResults = ref<SearchResults[]>([]);
const currentPage = ref(Number(route.query.page) || 1);
const totalPages = ref(0);
const totalResults = ref(0);

onMounted(() => {
  if (searchQuery.value) {
    multiSearch();
  }
});

watch(
  () => route.query,
  (newQuery) => {
    const newPage = Number(newQuery.page) || 1;
    if (currentPage.value !== newPage) {
      currentPage.value = newPage;
      multiSearch();
    }

    const newSearchQuery = newQuery.q as string;
    if (searchQuery.value !== newSearchQuery) {
      searchQuery.value = newSearchQuery || "";
      currentPage.value = 1;
      if (searchQuery.value) {
        multiSearch();
      }
    }
  },
  { deep: true },
);

const multiSearch = async () => {
  try {
    const token = config.public.TMDB_API_KEY;
    const res: Results = await $fetch(`https://api.themoviedb.org/3/search/multi?query=${searchQuery.value}&include_adult=false&language=en-US&page=${currentPage.value}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    searchResults.value = res.results || [];
    totalPages.value = res.total_pages || 0;
    totalResults.value = res.total_results || 0;

    console.log(searchResults.value);
  } catch (err) {
    console.error(err);
  }
};

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;

  router.push({
    query: {
      ...route.query,
      page: page,
    },
  });

  currentPage.value = page;
  multiSearch();

  window.scrollTo({ top: 0, behavior: "smooth" });
};

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
