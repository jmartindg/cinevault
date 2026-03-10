export default defineEventHandler(async (event) => {
  const type = getRouterParam(event, "type");
  const query = getQuery(event);
  const page = query.page ? String(query.page) : "1";

  if (!type || !["all", "movie", "tv"].includes(type)) {
    throw createError({
      statusCode: 400,
      message: "Invalid type. Must be 'all', 'movie', or 'tv'",
    });
  }

  return await tmdbFetch(`/trending/${type}/week`, {
    language: "en-US",
    page,
  });
});
