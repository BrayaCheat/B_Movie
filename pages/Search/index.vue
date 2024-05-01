<script setup>
import axios from "axios";

const { search_query } = useRoute().query;
const searchData = ref([]);
const page = ref(1)
const totalPages = ref([])

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
        search_query: search_query,
        page: page.value
      }
    });
    searchData.value = data.results;
    totalPages.value = data.total_pages
  } catch (error) {
    console.log(error);
  }
};

const prevPage = () => {
  if(page.value > 1){
    page.value--
    fetchSearchData()
  }
}

const nextPage = () => {
  if(page.value < totalPages.value){
    page.value++
    fetchSearchData()
  }
}

onBeforeMount(() => {
  fetchSearchData();
});
</script>

<template>
  <section id="search-result" class="lg:p-36 p-3 dark:bg-zinc-950">
    <UHorizontalNavigation :links="links" class="mt-20" />
    <div
      v-if="searchData"
      class="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-10 gap-2 place-items-center"
    >
      <div v-for="(item, index) in searchData" :key="index">
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
      <Skeleton/>
    </div>
  </section>
</template>
