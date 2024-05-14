<script setup>
// definePageMeta({
//   middleware: 'permission'
// })

import axios from "axios";

const route = useRoute();
const id = route.params.id;
const result = ref();
const image_url = "https://image.tmdb.org/t/p/original";
const videos = ref();
const youtubeURL = `https://www.youtube.com/embed/`;
const toast = useToast();

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

const addToBookMark = (movieName, movieName1) => {
  toast.add({
    title: `Bookmark Added!`,
    description: `${movieName || movieName1}`,
    icon: "i-heroicons-check-badge",
  });
};

const isOpen = ref(false);

const shareFacebook = () => {
  const url = encodeURIComponent("https://your-website.com/page-to-share");
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  window.open(facebookShareUrl, "_blank");
};

const shareLinkedIn = () => {
  const url = encodeURIComponent("https://your-website.com/page-to-share");
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?url=${url}`;
  window.open(linkedInShareUrl, "_blank");
};

const shareTwitter = () => {
  const url = encodeURIComponent("https://your-website.com/page-to-share");
  const tweet = encodeURIComponent("Check out this awesome content!");
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${tweet}`;
  window.open(twitterShareUrl, "_blank");
};

const fetchMovieById = async () => {
  try {
    const response = await $fetch(`/api/detail`, {
      method: "POST",
      body: {
        id: id,
      },
    });
    result.value = response;
    videos.value = response.videos.results;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchMovieById();
});
</script>
<template>
  <section id="movie-detail" class="dark:bg-zinc-950">
    <div
      v-if="result"
      :style="{
        backgroundImage: `url(${getImage(result.backdrop_path)})`,
      }"
      class="bg-cover"
    >
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-10 md:place-items-start place-items-stretch w-full h-full backdrop-blur-md backdrop-brightness-50 lg:p-36 p-3 lg:mt-0 mt-16"
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
          <ul
            class="flex flex-col gap-3 dark:text-gray-300 text-sm font-extralight"
          >
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

        <div v-if="videos" id="Trailer" class="mt-20 grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 place-items-center md:gap-10 gap-2 lg:col-span-2 col-span-1">
          <UHorizontalNavigation :links="label" class="border-b border-gray-800 lg:col-span-5 md:col-span-4 col-span-2" />
          <iframe
            class="p-1 dark:bg-gray-900 bg-gray-800 shadow duration-300 md:w-auto w-full md:h-auto h-[200px] rounded shadow border border-gray-800 hover:border-primary"
            v-for="vdo in videos.slice(0,4)"
            :key="vdo.key"
            :src="getTrailer(vdo.key)"
            frameborder="0"
          ></iframe>
        </div>
        <div v-else>
          <Skeleton/>
        </div>
      </div>
    </div>
    <div v-else>
      <Skeleton />
    </div>
  </section>
  <bottomNav />
</template>
