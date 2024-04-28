export default defineEventHandler(async (event) => {
    const { apiKey } = useRuntimeConfig(event);
    const body = await readBody(event);
    const response = await $fetch(`https://api.themoviedb.org/3/discover/movie?page=${body.page}&api_key=${apiKey}`);
    return response;
})