export default defineCachedEventHandler(
  async (event) => {
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
  },
  {
    maxAge: 60 * 60 * 24, // 24 hours
    getKey: (event) => `person-${getRouterParam(event, "id")}`,
  }
);
