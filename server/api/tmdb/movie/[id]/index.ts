export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Movie ID is required",
    });
  }

  return await tmdbFetch(`/movie/${id}`, {
    language: "en-US",
    append_to_response: "credits",
  });
});
