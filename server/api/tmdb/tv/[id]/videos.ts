export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "TV Show ID is required",
    });
  }

  return await tmdbFetch(`/tv/${id}/videos`, {
    language: "en-US",
  });
});
