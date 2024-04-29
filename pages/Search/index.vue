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
  try {
    const data = await $fetch('/api/search', {
      method: 'POST',
      body: {
        search_query: search_query
      }
    });
    searchData.value = data.results;
  } catch (error) {
    console.log(error);
  }
};

onBeforeMount(() => {
  fetchSearchData();
});
</script>

<template>
  <section id="search-result" class="lg:p-36 p-3 dark:bg-zinc-950">
    <UHorizontalNavigation :links="links" class="mt-20" />
    Search Result: {{ searchData.length }}
    <div v-if="searchData" class="grid lg:grid-cols-5 grid-cols-2 gap-2">
      <div v-for="(item, index) in searchData" :key="index">
        <MovieCard :movie="item" />
      </div>
    </div>
    <div v-else>
      <Skeleton/>
    </div>
  </section>
</template>
