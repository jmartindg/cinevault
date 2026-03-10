export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Person ID is required",
    });
  }

  return await tmdbFetch(`/person/${id}`, {
    language: "en-US",
  });
});
