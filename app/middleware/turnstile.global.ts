export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/verify") {
    return;
  }

  const verified = useCookie("turnstile-verified");

  if (!verified.value) {
    return navigateTo("/verify");
  }
});
