<script setup>
import axios from "axios";

const { search_query } = useRoute().query;
const searchData = ref([]);
const links = [
  {
    label: "Go back",
    click: () => {
      useRouter().go(-1);
    },
  },
  {
    label: `Search result`,
  },
];

const fetchSearchData = async () => {
  await axios
    .get(
      `https://api.themoviedb.org/3/search/movie?query=${search_query}&api_key=8e832907917b59ca36ac1406c0ced35e`
    )
    .then((res) => {
      searchData.value = res.data.results;
    })
    .catch((err) => console.log(err));
};

onBeforeMount(() => {
  fetchSearchData();
});
</script>

<template>
  <section id="search-result" class="lg:p-36 p-3 dark:bg-zinc-950">
    <UHorizontalNavigation :links="links" class="mt-20" />
    Search Result: {{ searchData.length }}
    <div class="grid lg:grid-cols-5 grid-cols-2 gap-2">
      <div v-for="(item, index) in searchData" :key="index">
        <MovieCard :movie="item" />
      </div>
    </div>
  </section>
</template>
