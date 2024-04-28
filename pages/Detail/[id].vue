<!-- https://api.themoviedb.org/3/movie/823464?api_key=8e832907917b59ca36ac1406c0ced35e -->
<script setup>
import axios from "axios";

const route = useRoute();
const id = route.params.id;
const result = ref();
const image_url = "https://image.tmdb.org/t/p/original";
const videos = ref();
const youtubeURL = `https://www.youtube.com/embed/`;

const label = [
  [
    {
      label: "Trailers",
    },
  ],
];

const getImage = (imagePath) => {
  return image_url + imagePath;
};

const getTrailer = (videoKey) => {
  const response = youtubeURL + videoKey;
  return response;
};

const fetchMovieById = async () => {
  try {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=8e832907917b59ca36ac1406c0ced35e&append_to_response=videos`
      )
      .then((res) => {
        result.value = res.data;
        videos.value = res.data.videos.results;
      });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchMovieById();
});
</script>
<template>
  <section id="movie-detail">
    <div
      v-if="result"
      :style="{
        backgroundImage: `url(${getImage(result.backdrop_path)})`,
      }"
      class="bg-cover"
    >
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-10 place-items-start w-full h-full backdrop-blur-md backdrop-brightness-50 lg:p-36 p-3 lg:mt-0 mt-16"
      >
        <img
          :src="getImage(result.poster_path)"
          class="lg:w-[70%] w-full h-[800px] object-cover rounded shadow-md"
        />
        <div
          id="movie-description"
          class="grid gap-10 text-gray-100 dark:text-gray-100 py-10"
        >
          <div class="flex flex-wrap items-center gap-4">
            <UButton label="HD" color="gray" />
            <UButton label="PG" color="gray" />
            <UButton
              color="gray"
              icon="i-heroicons-star"
              :label="`Rating ${result.vote_average.toFixed(1)}`"
            />
            <UButton
              color="gray"
              icon="i-heroicons-clock"
              :label="`${result.runtime} mins`"
            />
          </div>
          <UButton
            :label="result.original_title"
            class="text-3xl font-regular ps-0 text-white w-fit"
            variant="none"
            color="gray"
          />
          <article class="w-fit dark:text-gray-100 font-extralight">
            {{ result.overview }}
          </article>
          <ul class="flex flex-col gap-3 dark:text-gray-300 text-sm font-extralight">
            <li class="flex flex-wrap items-center gap-3">
              <h1 class="w-[200px]">Genres:</h1>
              <div v-for="item in result.genres" :key="item">
                {{ item.name }}
              </div>
            </li>

            <li class="flex flex-wrap items-center gap-3">
              <h1 class="w-[200px]">Country:</h1>
              <div v-for="item in result.production_countries" :key="item">
                {{ item.name }}
              </div>
            </li>

            <li class="flex flex-wrap items-center gap-3">
              <h1 class="w-[200px]">Release Date:</h1>
              {{ result.release_date }}
            </li>

            <li class="flex flex-wrap items-center gap-3">
              <h1 class="w-[200px]">Languages:</h1>
              <div v-for="item in result.spoken_languages" :key="item">
                {{ item.name }}
              </div>
            </li>

            <li class="flex flex-wrap items-center gap-3">
              <h1 class="w-[200px]">Productions:</h1>
              <div v-for="item in result.production_companies" :key="item">
                {{ item.name }}
              </div>
            </li>

            <li class="flex flex-wrap items-center gap-3">
              <h1 class="w-[200px]">Budget:</h1>
              ${{ result.budget }}
            </li>

            <li class="flex flex-wrap items-center gap-3">
              <h1 class="w-[200px]">Revenue:</h1>
              ${{ result.revenue }}
            </li>

            <li class="flex flex-wrap items-center gap-3">
              <h1 class="w-[200px]">Popularity:</h1>
              {{ result.popularity }} people
            </li>

            <li class="flex flex-wrap items-center gap-3">
              <h1 class="w-[200px]">Status:</h1>
              {{ result.status }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- movie_trailer -->
    <div class="my-10">
      <h1 class="lg:px-36 px-3 md:py-10 py-6 text-2xl text-gray-700 dark:text-gray-400">
        Trailers
      </h1>
      <UCarousel
        v-if="videos"
        :ui="{ item: 'basis-full' }"
        :items="videos"
        class="lg:px-36 px-3"
      >
        <iframe
          v-for="(vdo, index) in videos.slice(0, 4)"
          :key="index"
          class="me-4 rounded shadow-md md:w-[500px] md:h-[350px]"
          :src="getTrailer(vdo.key)"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </UCarousel>
      <div v-else>loading...</div>
    </div>
  </section>
  <bottomNav />
</template>
