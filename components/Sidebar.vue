<script setup>
import axios from "axios";

const movieData = ref([]);
let page = ref(1);
const links = [
  [
    {
      label: "Most view",
      click: () => {
        page.value = 1;
        fetchPopularMovie();
      },
    },
    {
      label: "Day",
      click: () => {
        page.value = 2;
        fetchPopularMovie();
      }
    },
    {
      label: "Week",
      click: () => {
        page.value = 3;
        fetchPopularMovie();
      },
    },
    {
      label: "Month",
      click: () => {
        page.value = 4;
        fetchPopularMovie();
      },
    },
  ],
];

const fetchPopularMovie = async () => {
  await axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page.value}&api_key=8e832907917b59ca36ac1406c0ced35e&limit=10`
    )
    .then((res) => {
      movieData.value = res.data.results;
    })
    .catch((err) => console.log(err));
};

onMounted(() => {
  fetchPopularMovie();
});
</script>

<template>
  <section id="sidebar" class="lg:grid hidden gap-10 mt-10">
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    />
    <div v-for="(movieData, index) in movieData" :key="index">
      <MiniCard :movieData="movieData" />
    </div>
  </section>
</template>
