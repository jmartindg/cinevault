export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = query.page ? String(query.page) : "1";
  const region = query.region ? String(query.region) : "PH";

  return await tmdbFetch("/movie/popular", {
    language: "en-US",
    page,
    region,
  });
});
