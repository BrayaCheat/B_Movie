export default defineEventHandler(async (event) => {
    const {apiKey} = useRuntimeConfig(event)
    const body = await readBody(event)
    const response = await $fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${body.id}`);
    return response
})