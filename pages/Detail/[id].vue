<!-- https://api.themoviedb.org/3/movie/823464?api_key=8e832907917b59ca36ac1406c0ced35e -->
<script setup>
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
      method: 'POST',
      body: {
        id: id,      
      }
    })
    result.value = response
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
            <UPopover>
              <UButton
                icon="i-heroicons-ellipsis-horizontal"
                color="gray"
                variant="ghost"
              />

              <template #panel>
                <div class="p-1 grid gap-2">
                  <UButton
                    @click="
                      addToBookMark(result.original_title, result.original_name)
                    "
                    label="Add to bookmark"
                    icon="i-heroicons-bookmark"
                    color="gray"
                    variant="ghost"
                  />
                  <UButton
                    @click="isOpen = true"
                    label="Share"
                    icon="i-heroicons-share"
                    color="gray"
                    variant="ghost"
                  />

                  <UModal v-model="isOpen">
                    <div class="flex p-4 items-center justify-between">
                      <h1>Sharing with</h1>
                      <UButton
                        @click="isOpen = false"
                        icon="i-heroicons-x-mark"
                        color="gray"
                        variant="ghost"
                      />
                    </div>
                    <UDivider />
                    <div class="p-4 flex items-center gap-10">
                      <UTooltip text="Share with facebook">
                        <Icon
                          @click="shareFacebook"
                          name="i-logos:facebook"
                          class="w-10 h-10 cursor-pointer"
                        />
                      </UTooltip>
                      <UTooltip text="Share with twitter">
                        <Icon
                          @click="shareTwitter"
                          name="i-skill-icons:twitter"
                          class="w-10 h-10 cursor-pointer"
                        />
                      </UTooltip>
                      <UTooltip text="Share with linkedin">
                        <Icon
                          @click="shareLinkedIn"
                          name="i-devicon:linkedin"
                          class="w-10 h-10 cursor-pointer"
                        />
                      </UTooltip>
                    </div>
                  </UModal>
                </div>
              </template>
            </UPopover>
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
      </div>
    </div>
    <div v-else>
      <Skeleton />
    </div>
    <!-- movie_trailer -->
    <!-- <div class="my-10">
      <h1
        class="lg:px-36 px-3 md:py-10 py-6 text-2xl text-gray-700 dark:text-gray-400"
      >
        Trailers
      </h1> -->
    <!-- <UCarousel
        v-if="videos"
        :ui="{ item: 'basis-full' }"
        :items="videos"
        class="lg:px-36 px-3"
      >
        <iframe
          v-for="(vdo, index) in videos"
          :key="index"
          class="me-4 rounded shadow-md md:w-[500px] md:h-[350px]"
          :src="getTrailer(vdo.key)"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </UCarousel>
      <div v-else>
        <Skeleton />
      </div> -->
    <!-- </div> -->
  </section>
  <bottomNav />
</template>
