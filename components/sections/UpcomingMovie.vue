<script setup>
import axios from "axios";

const results = ref([]);
let page = ref(1);
const links = [
  [
    {
      label: "Upcoming Movies",
      to: '/'
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
    const response = await $fetch(`/api/upcoming`, {
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
  <section id="upcoming" class="grid gap-10 mt-10">
    <div class="flex items-center justify-start gap-6">
      <UHorizontalNavigation
        :links="links"
      />
    </div>
    <div
      v-if="results"
      class="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2 place-items-center"
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
