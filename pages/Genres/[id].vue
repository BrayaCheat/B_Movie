<script setup>
import axios from "axios";

const { id } = useRoute().params;
const { genre_title } = useRoute().query;
const Genres = ref([]);
const page = ref(1)
const totalPages = ref([])
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
        page: page.value
      },
    });
    Genres.value = response.results
    totalPages.value = response.total_pages
  } catch (error) {
    console.log(error);
  }
};

const prevPage = () => {
  if(page.value > 1){
    page.value--
    getGenre()
  }
}

const nextPage = () => {
  if(page.value < totalPages.value){
    page.value++
    getGenre()
  }
}

const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  getGenre();
  scrollToTop();
});
</script>

<template>
  <section id="Genres-apge" class="grid gap-10 lg:p-36 p-3 dark:bg-zinc-950">
    <div class="flex items-center justify-start gap-6">
      <UHorizontalNavigation
        :links="link"
        class="border-b border-gray-200 dark:border-gray-800 lg:mt-0 mt-20"
      />
    </div>
    <div
      v-if="Genres"
      class="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-10 gap-2 place-items-center"
    >
      <div v-for="(item, index) in Genres" :key="index">
        <MovieCard :movie="item" />
      </div>
      <!-- paginate -->
      <div class="flex items-center gap-9 lg:col-span-5 md:col-span-4 col-span-2 my-9 md:text-lg text-sm">
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
      <Skeleton />
    </div>
  </section>
  <bottomNav />
</template>
