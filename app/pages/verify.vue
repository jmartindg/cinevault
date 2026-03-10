<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="text-center p-8">
      <h1 class="text-2xl font-bold mb-4">Verifying you're human</h1>
      <p class="text-base-content/70 mb-6">Please wait while we verify your browser</p>
      <div class="flex justify-center">
        <NuxtTurnstile v-model="token" />
      </div>
      <p v-if="error" class="text-error mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const token = ref("");
const error = ref("");

watch(token, async (newToken) => {
  if (newToken) {
    try {
      const result = await $fetch<{ success: boolean }>("/_turnstile/validate", {
        method: "POST",
        body: { token: newToken },
      });

      if (result?.success) {
        const cookie = useCookie("turnstile-verified", {
          maxAge: 60 * 60 * 24,
        });
        cookie.value = "true";
        await navigateTo("/");
      } else {
        error.value = "Verification failed. Please try again.";
      }
    } catch (e) {
      error.value = "Verification failed. Please try again.";
    }
  }
});
</script>
