export default defineCachedEventHandler(
  async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Movie ID is required",
      });
    }

    return await tmdbFetch(`/movie/${id}/videos`, {
      language: "en-US",
    });
  },
  {
    maxAge: 60 * 60 * 24, // 24 hours
    getKey: (event) => `movie-${getRouterParam(event, "id")}-videos`,
  }
);
