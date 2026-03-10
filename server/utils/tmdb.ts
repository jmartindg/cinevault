const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function tmdbFetch<T>(endpoint: string, query?: Record<string, string | number | undefined>): Promise<T> {
  const config = useRuntimeConfig();
  const apiKey = config.TMDB_API_KEY;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: "TMDB API key not configured",
    });
  }

  const queryString = query
    ? "?" +
      Object.entries(query)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join("&")
    : "";

  const url = `${TMDB_BASE_URL}${endpoint}${queryString}`;

  return await $fetch<T>(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
