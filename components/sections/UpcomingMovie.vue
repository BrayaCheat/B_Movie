<script setup>
import axios from "axios";

const results = ref([]);
const route = useRoute();

const links = [
  [
    {
      label: "Upcoming Movies",
    },
  ],
  [
    {
      label: "See more",
      to: "/Movie",
    },
  ],
];

let page = ref(1);
const totalPages = ref([]);

const fetchMovies = async () => {
  try {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?page=${page.value}&api_key=8e832907917b59ca36ac1406c0ced35e`
      )
      .then((res) => {
        results.value = res.data.results;
        totalPages.value = res.data.total_pages;
      });
  } catch (error) {
    console.log(error);
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    fetchMovies();
  }
};

const prevPage = () => {
  if (page.value >= 1) {
    page.value--;
    fetchMovies();
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
        class="border-b border-gray-200 dark:border-gray-800"
      />
    </div>
    <div
      v-if="results"
      class="grid lg:grid-cols-4 grid-cols-2 gap-2 place-items-center"
    >
      <div v-for="(result, index) in results" :key="index">
        <MovieCard :movie="result" />
      </div>
      <!-- <UPagination
        class="lg:col-span-4 col-span-2"
        v-model="page"
        :page-count="results.length"
        :total="totalPages"
      >
        <template #prev>
          <UTooltip text="Previous page">
            <UButton
              icon="i-heroicons-arrow-small-left-20-solid"
              color="primary"
              class="rtl:[&_span:first-child]:rotate-180 me-2 rounded-none"
              @click="prevPage"
              :disabled="page === 1"
            />
          </UTooltip>
        </template>
        <template #next>
          <UTooltip text="Next page">
            <UButton
              icon="i-heroicons-arrow-small-right-20-solid"
              color="primary"
              class="rtl:[&_span:first-child]:rotate-180 ms-2 rounded-none"
              @click="nextPage"
              :disabled="page === totalPages"
            />
          </UTooltip>
        </template>
      </UPagination> -->
    </div>
  </section>
</template>
