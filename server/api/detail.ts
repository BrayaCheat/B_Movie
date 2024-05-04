export default defineEventHandler(async (event) => {
    const {apiKey} = useRuntimeConfig(event)
    const body = await readBody(event)
    const response = await $fetch(`https://api.themoviedb.org/3/movie/${body.id}?api_key=${apiKey}&append_to_response=videos`)
    return response;
})