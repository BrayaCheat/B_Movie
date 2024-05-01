<script setup>
import axios from "axios";
const carouselRef = ref();
const image_url = "https://image.tmdb.org/t/p/original";
const results = ref([]);
const toast = useToast();

const getImage = (imagePath) => {
  return image_url + imagePath;
};

const fetchMovies = async () => {
  try {
    await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?page=9&api_key=8e832907917b59ca36ac1406c0ced35e`
      )
      .then((res) => {
        results.value = res.data.results;
      });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchMovies();
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 6000);
});

const addToBookMark = (movieName, movieName1) => {
  toast.add({
    title: `Bookmark Added!`,
    description: `${movieName || movieName1}`,
    icon: "i-heroicons-check-badge",
  });
};
</script>

<template>
  <UCarousel
    ref="carouselRef"
    v-slot="{ item }"
    :items="results"
    :ui="{ item: 'basis-full' }"
    class="overflow-hidden"
    indicators
  >
    <div
      class="absolute bg-black backdrop-blur-xl w-full h-full opacity-50 z-10 bg-gradient-to-t from-black to-black"
    />
    <div
      class="absolute flex mx-auto flex-col items-center justify-center z-20 w-full h-full lg:px-36 p-1 lg:pt-64 gap-3"
    >
      <h1 class="lg:text-5xl text-xl text-white text-center md:mt-0 mt-28">
        {{ item.original_title }}
      </h1>
      <div class="grid grid-cols-3 md:gap-3 gap-0">
        <UButton
          :label="item.popularity + ' views'"
          icon="i-heroicons-eye"
          color="gray"
          variant="ghost"
          class="lg:text-lg text-xs text-gray-400"
          block
        />
        <UButton
          :label="item.release_date"
          icon="i-heroicons-calendar-days"
          color="gray"
          variant="ghost"
          class="lg:text-lg text-xs text-gray-400"
          block
        />
        <UButton
          :label="'Rating: ' + item.vote_average.toFixed(1)"
          icon="i-heroicons-star"
          color="gray"
          variant="ghost"
          class="lg:text-lg text-xs text-gray-400"
          block
        />
      </div>
      <p class="text-gray-400 lg:text-lg text-xs text-gray-400 md:block hidden">
        {{ item.overview }}
      </p>
      <div class="grid grid-cols-2 gap-3 mt-10">
        <UButton
          :to="`/Detail/${item.id}`"
          label="Watch Now"
          icon="i-heroicons-play"
          color="primary"
          variant="solid"
          size="md"
          trailing
          class="text-white dark:text-white lg:text-lg text-xs text-gray-200 rounded-full"
          block
        />
        <UButton
          @click="addToBookMark(item.original_title, item.title)"
          label="Add Bookmark"
          icon="i-heroicons-heart"
          color="primary"
          variant="ghost"
          size="md"
          trailing
          class="lg:text-lg text-xs text-gray-200 hover:text-black rounded-full"
          block
        />
      </div>
    </div>
    <img
      :src="getImage(item.backdrop_path)"
      class="w-full md:h-[800px] h-[500px] object-cover"
      draggable="false"
    />
  </UCarousel>
</template>
