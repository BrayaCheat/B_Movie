<!-- https://api.themoviedb.org/3/discover/tv -->
<script setup>
import axios from "axios";

const movieData = ref([]);
const links = [
  [
    {
      label: "Go back",
      click: () => {
        useRouter().go(-1);
      },
    },
    {
      label: "Movies",
    },
  ],
];
const totalPages = ref([]);
const page = ref(1);

const fetchMovie = async () => {
  try {
    const data = await $fetch('/api/movie', {
      method: 'POST',
      body: {
        page: page.value
      }
    });
    movieData.value = data.results;
    totalPages.value = data.total_pages;
  } catch (error) {
    console.log(error);
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchMovie();
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    fetchMovie();
  }
};

onMounted(() => {
  fetchMovie();
});
</script>

<template>
  <section id="tv-page" class="grid gap-10 lg:p-36 p-3 dark:bg-zinc-950">
    <div class="flex items-center justify-start gap-6">
      <UHorizontalNavigation
        :links="links"
        class="border-b border-gray-200 dark:border-gray-800 lg:mt-0 mt-20"
      />
    </div>
    <div v-if="movieData" class="grid lg:grid-cols-5 grid-cols-2 lg:gap-10 gap-2 place-items-center">
      <div v-for="(item, index) in movieData" :key="index">
        <MovieCard :movie="item" />
      </div>
      <UPagination
        class="lg:col-span-5 col-span-2 mt-10"
        v-model="page"
        :page-count="movieData.length"
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
        <template #modelValue>
          <div>
            <h1>hello</h1>
          </div>
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
      </UPagination>
    </div>
    <div v-else>
      <Skeleton/>
    </div>
  </section>
  <bottomNav />
</template>
