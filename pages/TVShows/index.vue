<script setup>
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
const totalPages = ref();
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
    totalPages.value = 10000;
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

const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};

const changePage = (p) => {
  page.value = p
  fetchTVShow()
}

watch(page, (n,o) => {
  if(n){
    changePage(n)
  }
})

onMounted(() => {
  fetchTVShow();
  scrollToTop();
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
      <div class="flex items-center gap-9 lg:col-span-5 md:col-span-4 col-span-2 my-9 md:text-lg text-sm">
        <UPagination
          :pageCount="tvData.length"
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
                :disabled="page === 500"
              />
            </UTooltip>
          </template>
        </UPagination>
      </div>
    </div>
    <div v-else>
      <Skeleton/>
    </div>
  </section>
  <bottomNav/>
</template>
