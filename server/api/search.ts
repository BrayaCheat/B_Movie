export default defineEventHandler(async (event) => {
    const {apiKey} = useRuntimeConfig(event)
    const body = await readBody(event)
    const response = await $fetch(`https://api.themoviedb.org/3/search/movie?query=${body.search_query}&api_key=${apiKey}`)
    return response;
})