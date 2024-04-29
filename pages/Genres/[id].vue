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
  try {
    const response = await $fetch(`/api/genres`, {
      method: "POST",
      body: {
        id: id,
      },
    });
    Genres.value = response.results
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getGenre();
});
</script>

<template>
  <section id="Genres">
    <div
      v-if="Genres"
      class="grid md:grid-cols-5 grid-cols-2 gap-2 lg:p-36 p-3 dark:bg-zinc-950"
    >
      <UHorizontalNavigation
        :links="link"
        size="xl"
        class="border-b border-gray-200 dark:border-gray-800 md:col-span-5 col-span-2 lg:mt-0 mt-20"
      />
      <div v-for="(genre, index) in Genres" :key="index">
        <MovieCard :movie="genre" />
      </div>
    </div>
    <div v-else>
      <Skeleton />
    </div>
  </section>
  <bottomNav />
</template>
