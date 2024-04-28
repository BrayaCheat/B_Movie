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
const searchQuery = ref("");
const MovieGenres = ref([]);
const TVGenres = ref([]);

const account = ref({
  username: "Braya Cheat",
  email: "BrayaCheat@gmail.com",
  password: "123",
});

const items = [
  // [
  //   {
  //     label: account.value.email,
  //     slot: "account",
  //     disabled: true,
  //   },
  // ],
  [
    {
      label: "Home",
      icon: "i-heroicons-sparkles-20-solid",
      to: "/",
    },
  ],
  [
    {
      label: "Movies",
      icon: "i-heroicons-film-20-solid",
      to: "/Movie",
    },
    {
      label: "TV Shows",
      icon: "i-heroicons-tv-20-solid",
      to: "/TVShows",
    },
    {
      label: "Genres",
      icon: "i-heroicons-tag-20-solid",
      click: () => {
        showPopup.value = true;
      },
    },
  ],
  // [
  //   {
  //     label: "Sign out",
  //     icon: "i-heroicons-arrow-left-on-rectangle",
  //     click: () => {
  //       alert("True");
  //     },
  //   },
  // ],
];

const showPopup = ref(false);

const PassingSearch = () => {
  navigateTo(`/Search?search_query=${searchQuery.value}`).then(() => {
    location.reload();
  });
};

const getMovieGenres = async () => {
  await axios
    .get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=8e832907917b59ca36ac1406c0ced35e`
    )
    .then((res) => {
      MovieGenres.value = res.data.genres;
    });
};

const getTVGenres = async () => {
  await axios
    .get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=8e832907917b59ca36ac1406c0ced35e`
    )
    .then((res) => {
      TVGenres.value = res.data.genres;
    });
};

onMounted(() => {
  getMovieGenres();
  getTVGenres();
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
        <UDropdown
          :items="items"
          :ui="{ item: { disabled: 'cursor-text select-text' } }"
          :popper="{ placement: 'bottom-start' }"
        >
          <Icon
            name="i-material-symbols-light:lists-rounded"
            class="w-6 h-6 dark:text-white text-white"
          />

          <template #account="{ item }">
            <div class="text-left">
              <p>Signed in as</p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </template>

          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </template>
          <UPopover v-model:open="showPopup"
          >
            <UButton class="hidden" />
            <template #panel>          
              <div class="grid grid-cols-2 gap-3 p-3">
                <NuxtLink
                  class="hover:bg-gray-800 rounded-md shadow duration-300 p-2 text-sm"
                  :to="`/MovieGenres/${item.id}?genre_title=${item.name}`"
                  v-for="(item, index) in MovieGenres"
                  :key="index"
                >
                  {{ item.name }}
                </NuxtLink>
              </div>
            </template>
          </UPopover>
        </UDropdown>
        <!-- genres_popup -->

        <!-- home__btn -->
        <UButton
          label="B-Movie"
          size="xl"
          trailing="true"
          variant="none"
          class="lg:text-2xl text-sm ps-0 text-white dark:text-white"
          to="/"
        />
      </div>

      <form @submit.prevent="PassingSearch" enctype="multipart/form-data">
        <UInput
          icon="i-heroicons-magnifying-glass"
          placeholder="Search movies..."
          class="md:w-[500px] w-[220px]"
          size="xs"
          v-model="searchQuery"
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
