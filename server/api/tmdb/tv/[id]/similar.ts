export default defineCachedEventHandler(
  async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "TV Show ID is required",
      });
    }

    return await tmdbFetch(`/tv/${id}/similar`, {
      language: "en-US",
      page: "1",
    });
  },
  {
    maxAge: 60 * 60 * 24, // 24 hours
    getKey: (event) => `tv-${getRouterParam(event, "id")}-similar`,
  }
);
