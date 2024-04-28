<script setup>
    import axios from 'axios'

    const {id} = useRoute().params
    const {genre_title} = useRoute().query
    const Genres = ref([])
    const getGenre = async () => {
        await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=8e832907917b59ca36ac1406c0ced35e&with_genres=${id}`)
        .then((res) => Genres.value = res.data.results)
        .catch(err => console.log(err))
    }

    const link = [
        [
            {
                label: genre_title
            }
        ]
    ]

    onMounted(() => {
        getGenre()
    })
</script>

<template>
    <section id="Genres">
        <div class="grid grid-cols-5 gap-10 p-36">
            <UHorizontalNavigation
        :links="link"
        size="xl"
        class="border-b border-gray-200 dark:border-gray-800 col-span-5"
      />
            <div v-for="genre,index in Genres" :key="index">
                <MovieCard :movie="genre"/>
            </div>
        </div>
    </section>
    <bottomNav />
</template>