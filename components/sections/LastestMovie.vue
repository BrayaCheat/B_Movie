<script setup>
import axios from "axios";

let page = ref(1);
const results = ref([]);
const links = [
  [
    {
      label: "Lastest Movies",
    },
  ],
  [
    {
      label: "See more",
      to: "/Movie",
    },
  ],
];

const fetchMovies = async () => {
  try {
    const response = await $fetch(`/api/lastestmovie`, {
      method: "POST",
      body: {
        page: page.value,
      },
    });
    results.value = response.results;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchMovies();
});
</script>

<template>
  <section id="latest-movie" class="grid gap-10 mt-10">
    <div class="flex items-center justify-start gap-6">
      <UHorizontalNavigation
        :links="links"
        class="border-b border-gray-200 dark:border-gray-800"
      />
    </div>
    <div
      v-if="results"
      class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 place-items-center"
    >
      <div v-for="(result, index) in results" :key="index">
        <MovieCard :movie="result" />
      </div>
    </div>
    <div v-else>
      <Skeleton />
    </div>
  </section>
</template>
