<template>
  <main class="hero-section py-12 md:py-28" :style="backdropStyle">
    <div class="overlay"></div>
    <section class="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center md:px-8">
      <h1 class="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">{{ content.title }}</h1>
      <p class="mx-auto mt-4 mb-8 max-w-3xl text-lg text-white/90 md:text-xl">{{ content.description }}</p>
      <form class="flex w-full flex-col justify-center gap-2 sm:flex-row">
        <input type="search" placeholder="Search movies or TV shows" class="input input-bordered input-lg w-full md:w-xl xl:w-2xl" />
        <button type="submit" class="btn btn-primary btn-lg">Search</button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
interface Content {
  title: string;
  description: string;
}

interface BackdropImage {
  backdrop_path: string;
}

interface Results {
  results: BackdropImage[];
}

const config = useRuntimeConfig();
const backdropPath = ref<string>("");
const imageBaseUrl = ref("https://image.tmdb.org/t/p/original");
const content = reactive<Content>({
  title: "Your Ultimate Movie & TV Shows Archive",
  description: "Discover, track, and organize your favorite movies and TV shows all in one place.",
});

const backdropStyle = computed(() => {
  const url = getBackdropUrl(backdropPath.value);
  return url
    ? {
        backgroundImage: `url(${url})`,
      }
    : {};
});

onMounted(() => {
  getBackdropPath();
});

const getBackdropUrl = (backdropPath: string) => {
  if (!backdropPath) return undefined;
  return `${imageBaseUrl.value}${backdropPath}`;
};

const getBackdropPath = async () => {
  try {
    const token = config.public.TMDB_API_KEY;
    const res: Results = await $fetch("https://api.themoviedb.org/3/trending/all/week?language=en-US", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.results && res.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * res.results.length);
      backdropPath.value = res.results[randomIndex].backdrop_path;
    }
  } catch (err) {
    console.error(err);
  }
};
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
