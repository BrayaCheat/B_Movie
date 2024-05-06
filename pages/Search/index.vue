<script setup>
const { search_query } = useRoute().query;
const searchData = ref([]);
const page = ref(1);
const totalPages = ref();

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
    const data = await $fetch("/api/search", {
      method: "POST",
      body: {
        search_query: search_query,
        page: page.value,
      },
    });
    searchData.value = data.results;
    totalPages.value = data.total_results
  } catch (error) {
    console.log(error);
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchSearchData();
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    fetchSearchData();
  }
};

const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};

const changePage = (p) => {
  page.value = p;
  fetchSearchData();
};

watch(page, (n, o) => {
  if (n) {
    changePage(n);
  }
});

onBeforeMount(() => {
  fetchSearchData();
  scrollToTop();
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
      <div
        class="flex items-center gap-9 lg:col-span-5 md:col-span-4 col-span-2 my-9 md:text-lg text-sm"
      >
        <UPagination
          :pageCount="searchData.length"
          v-model="page"
          :total="totalPages"
          :ui="{
            rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md',
          }"
        >
          <template #prev>
            <UTooltip text="Previous page">
              <UButton
                icon="i-heroicons-arrow-small-left-20-solid"
                color="primary"
                :ui="{ rounded: 'rounded-full' }"
                class="rtl:[&_span:first-child]:rotate-180 me-2"
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
                :ui="{ rounded: 'rounded-full' }"
                class="rtl:[&_span:last-child]:rotate-180 ms-2"
                @click="nextPage"
                :disabled="page === (totalPages / 20)"
              />
            </UTooltip>
          </template>
        </UPagination>
      </div>
    </div>
    <div v-else>
      <Skeleton />
    </div>
  </section>
</template>
