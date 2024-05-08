<script setup>
import axios from "axios";

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
const toast = useToast();
const searchQuery = ref();
const Genres = ref([]);
const isSlideover = ref(false);
const items = [
  [
    {
      label: "Home",
      icon: "i-heroicons-home",
      to: "/",
      click: () => {
        isSlideover.value = false;
      },
    },
  ],
  [
    {
      label: "Movies",
      icon: "i-heroicons-film",
      to: "/Movie",
      click: () => {
        isSlideover.value = false;
      },
    },
  ],
  [
    {
      label: "TV Shows",
      icon: "i-heroicons-tv",
      to: "/TVShows",
      click: () => {
        isSlideover.value = false;
      },
    },
  ],
  [
    {
      label: "Genres",
      icon: "i-heroicons-tag",
    },
  ],
];

const showPopup = ref(false);

const PassingSearch = () => {
  if (!searchQuery.value) {
    toast.add({
      title: "Textfield can not be blank!",
      icon: "i-heroicons-exclamation-triangle-20-solid",
      color: "red",
    });
  } else {
    navigateTo(`/Search?search_query=${searchQuery.value}`).then(() => {
      location.reload();
    });
  }
};

const getGenres = async () => {
  try {
    await axios.get(`/api/ListGenres`).then((res) => {
      Genres.value = res.data.genres;
    });
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  getGenres();
});
</script>

<template>
  <section id="top-nav">
    <nav
      class="z-40 top-0 w-full flex flex-wrap items-center justify-between lg:px-36 p-3 md:py-6 uppercase"
      :class="
        $route.path === '/'
          ? 'bg-transparent absolute'
          : 'fixed dark:bg-gray-900 bg-gray-800'
      "
    >
      <div class="flex items-center gap-3">
        <UButton
          icon="i-heroicons-bars-3-20-solid"
          class="dark:text-gray-200 text-gray-200"
          variant="none"
          @click="isSlideover = true"
        />
        <USlideover v-model="isSlideover" side="left">
          <div class="p-3 overflow-auto">
            <div class="flex items-center justify-between">
              <UButton
                label="B-MOVIE"
                color="white"
                variant="none"
                class="mb-3 text-2xl"
              />
              <UButton
                icon="i-heroicons-x-mark-20-solid"
                class="mb-3"
                color="white"
                @click="isSlideover = false"
              />
            </div>
            <UVerticalNavigation :links="items" />
            <UVerticalNavigation :links="Genres">
              <template #default="{ link }">
                <NuxtLink
                  class="duration-300 ms-6 text-sm relative w-full text-start"
                  :to="`/Genres/${link.id}?genre_title=${link.name}`"
                  @click="isSlideover = false"
                >
                  {{ link.name }}
                </NuxtLink>
              </template>
            </UVerticalNavigation>
          </div>
        </USlideover>
        <!-- genres_popup -->

        <!-- home__btn -->
        <UButton
          label="B-Movie"
          size="xl"
          trailing
          variant="none"
          class="lg:text-2xl text-sm ps-0 text-white dark:text-white"
          to="/"
        />
      </div>

      <form @submit.prevent="PassingSearch" enctype="multipart/form-data">
        <UInput
          icon="i-heroicons-magnifying-glass"
          placeholder="Search movies..."
          class="md:w-[500px] w-[220px] text-black font-medium"
          size="xs"
          v-model="searchQuery"
          variant="solid"
          color="primary"
        />
      </form>
      <!-- Toggle__DarkMode -->
      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        color="white"
        variant="link"
        @click="isDark = !isDark"
        size="lg"
        class="text-white dark:text-white lg:text-md text-sm"
      />
    </nav>
  </section>
</template>
