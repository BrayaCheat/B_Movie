<!-- https://api.themoviedb.org/3/discover/tv -->
<script setup>
import axios from "axios";

const tvData = ref([]);
const links = [
[
    {
      label: "Go back",
      click: () => {
        useRouter().go(-1);
      },
    },
    {
      label: "TV-Shows",
    },
  ],
];
const totalPages = ref([]);
const page = ref(1);

const fetchTVShow = async () => {
  try {
    const data = await $fetch('/api/tv-show', {
      method: 'POST',
      body: {
        page: page.value
      }
    });
    tvData.value = data.results;
    totalPages.value = data.total_pages;
  } catch (error) {
    console.log(error);
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchTVShow();
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    fetchTVShow();
  }
};

onMounted(() => {
  fetchTVShow();
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
    <div
      v-if="tvData"
      class="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-10 gap-2 place-items-center"
    >
      <div v-for="(item, index) in tvData" :key="index">
        <MovieCard :movie="item" />
      </div>
      <!-- paginate -->
      <div class="flex items-center gap-9 lg:col-span-5 md:col-span-4 col-span-2 my-9">
        <UButton
          @click="prevPage"
          icon="i-heroicons-backward-20-solid"
          color="white"
        />
        <span>{{ page }} / {{ totalPages }}</span>
        <UButton
          @click="nextPage"
          icon="i-heroicons-forward-20-solid"
          color="white"
        />
      </div>
    </div>
    <div v-else>
      <Skeleton/>
    </div>
  </section>
  <bottomNav/>
</template>
