<script setup>
import axios from "axios";

const { id } = useRoute().params;
const { genre_title } = useRoute().query;
const Genres = ref([]);
const link = [
  [
    {
      label: "Go back",
      click: () => {
        useRouter().go(-1);
      },
    },
    {
      label: genre_title,
    },
  ],
];

const getGenre = async () => {
  await axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=8e832907917b59ca36ac1406c0ced35e&with_genres=${id}`
    )
    .then((res) => {
      console.log(res.data)
      Genres.value = res.data.results;
      
    })
    .catch((err) => console.log(err));
};

onMounted(() => {
  getGenre();
});
</script>

<template>
  <section id="Genres">
    <div class="grid md:grid-cols-5 grid-cols-2 gap-2 lg:p-36 p-3">
      <UHorizontalNavigation
        :links="link"
        size="xl"
        class="border-b border-gray-200 dark:border-gray-800 md:col-span-5 col-span-2 lg:mt-0 mt-20"
      />
      <div v-for="(genre, index) in Genres" :key="index">
        <MovieCard :movie="genre" />
      </div>
    </div>
  </section>
  <bottomNav />
</template>
