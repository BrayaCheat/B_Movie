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
      icon: "i-heroicons-home-20-solid",
      to: "/",
      click: () => {
        isSlideover.value = false
      }
    },
  ],
  [
    {
      label: "Movies",
      icon: "i-heroicons-film-20-solid",
      to: "/Movie",
      click: () => {
        isSlideover.value = false
      }
    },
  ],
  [
    {
      label: "TV Shows",
      icon: "i-heroicons-tv-20-solid",
      to: "/TVShows",
      click: () => {
        isSlideover.value = false
      }
    },
  ],
  [
    {
      label: "Genres",
      icon: "i-heroicons-tag-20-solid",
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
        <!-- <UDropdown
          :items="items"
          :ui="{ item: { disabled: 'cursor-text select-text' } }"
          :popper="{ placement: 'bottom-start' }"
        >
        <div class="duration-300 p-0.5 dark:hover-bg-gray-700 hover:bg-gray-800 rounded-md shadow-md">
          <Icon
            name="i-solar:hamburger-menu-line-duotone"
            class="w-6 h-6 dark:text-white text-white"
          />
        </div>
         

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
          <UPopover v-model:open="showPopup">
            <UButton class="hidden" />
            <template #panel>
              <div class="grid grid-cols-2 gap-3 p-3">
                <NuxtLink
                  class="hover:bg-gray-800 rounded-md shadow duration-300 p-2 text-sm"
                  :to="`/Genres/${item.id}?genre_title=${item.name}`"
                  v-for="(item, index) in Genres"
                  :key="index"
                >
                  {{ item.name }}
                </NuxtLink>
              </div>
            </template>
          </UPopover>
        </UDropdown> -->
        <UButton
          icon="i-heroicons-bars-3-20-solid"
          color="white"
          @click="isSlideover = true"
        />
        <USlideover v-model="isSlideover" side="left">
          <div class="p-3">
            <div class="flex items-center justify-between">
              <UButton
                label="B-MOVIE"
                color="white"
                variant="none"
                class="mb-6 text-2xl"
              />
              <UButton
                icon="i-heroicons-x-mark-20-solid"
                class="mb-6"
                color="white"
                @click="isSlideover = false"
              />
            </div>
            <UVerticalNavigation :links="items" />
            <UVerticalNavigation :links="Genres" class="h-fit overflow-scroll">
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
