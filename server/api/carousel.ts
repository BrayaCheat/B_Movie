export default defineEventHandler(async (event) => {
    const {apiKey} = useRuntimeConfig(event)
    const response = await $fetch(`https://api.themoviedb.org/3/movie/popular?page=1&api_key=${apiKey}`)
    return response
})