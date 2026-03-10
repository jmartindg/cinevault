export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event);
    const page = query.page ? String(query.page) : "1";
    const region = query.region ? String(query.region) : "PH";

    return await tmdbFetch("/movie/popular", {
      language: "en-US",
      page,
      region,
    });
  },
  {
    maxAge: 60 * 60, // 1 hour
    getKey: (event) => {
      const query = getQuery(event);
      return `movie-popular-${query.page || 1}-${query.region || "PH"}`;
    },
  }
);
