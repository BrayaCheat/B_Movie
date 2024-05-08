export default defineEventHandler(async (event) => {
  const { apiKey } = useRuntimeConfig();
  const body = await readBody(event);
  const response = await $fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${body.page}`
  );
  return response;
});
