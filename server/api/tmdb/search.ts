export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const searchQuery = query.query ? String(query.query) : "";
  const type = query.type ? String(query.type) : "multi";
  const page = query.page ? String(query.page) : "1";

  if (!searchQuery) {
    throw createError({
      statusCode: 400,
      message: "Search query is required",
    });
  }

  if (!["multi", "movie", "tv"].includes(type)) {
    throw createError({
      statusCode: 400,
      message: "Invalid type. Must be 'multi', 'movie', or 'tv'",
    });
  }

  return await tmdbFetch(`/search/${type}`, {
    query: searchQuery,
    include_adult: "false",
    language: "en-US",
    page,
  });
});
