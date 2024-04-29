export default defineEventHandler(async (event) => {
    const {apiKey} = useRuntimeConfig(event)
    const response = await $fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
    return response;
})