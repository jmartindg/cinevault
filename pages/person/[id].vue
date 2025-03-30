<template>
  <section class="mx-auto max-w-7xl px-2 py-8 sm:py-12">
    <p>{{ route.params.id }}</p>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
