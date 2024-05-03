export default defineEventHandler(async (event) => {
    const {apiKey} = useRuntimeConfig(event)
    const body = await readBody(event)
    const response = await $fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${body.page}&api_key=${apiKey}`)
    return response
})