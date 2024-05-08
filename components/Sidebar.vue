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
      },
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
    .post(`/api/sidebar`, {
      page: page.value,
    })
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
  <section id="sidebar" class="lg:grid hidden gap-3 mt-10">
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800 mb-7"
    />
    <div v-for="(movieData, index) in movieData" :key="index">
      <MiniCard :movieData="movieData" />
    </div>
  </section>
</template>
