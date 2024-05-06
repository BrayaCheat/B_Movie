<script setup>
const image_url = "https://image.tmdb.org/t/p/w500";
const { movie } = defineProps(["movie"]);
// const detailMovie = ref();

// const getDetailMovie = async () => {
//   try {
//     const response = await $fetch("/api/detail", {
//       method: "POST",
//       body: {
//         id: movieId.value,
//       },
//     });
//     detailMovie.value = response;
//   } catch (error) {
//     console.log(error);
//   }
// };

const getImage = (imagePath) => {
  return image_url + imagePath;
};

</script>

<template>
  <section id="movie-card">
    <div
      v-if="movie"
      class="card p-1.5 text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-950 dark:hover:border-primary hover:border-primary cursor-pointer shadow duration-300 overflow-hidden"
    >
      <NuxtLink
        :to="`/Detail/${movie.id}`"
        class="grid place-items-center gap-3"
      >
        <img
          :src="getImage(movie.poster_path)"
          class="object-cover rounded-md"
        />
        <div
          class="flex items-center gap-1 text-xs py-1 px-2 dark:bg-gray-800 bg-gray-300 rounded-md shadow-sm"
        >
          <h1>Movie -</h1>
          <h1 v-if="movie.release_date">
            {{ movie.release_date.slice(0, 4) }} -
          </h1>
          <h1 class="flex items-center gap-1">
            <Icon
              name="i-ic:baseline-star"
              size="12"
              class="text-yellow-200"
            />{{ movie.vote_average.toFixed(1) }}
          </h1>
        </div>
        <h1
          v-if="movie.original_title"
          id="movie_title"
          class="md:text-sm text-xs text-black dark:text-white text-center md:h-12 h-10 mt-3"
        >
          {{ movie.original_title.slice(0, 40) }}...
        </h1>
      </NuxtLink>
    </div>
    <!-- loading... -->
    <div
      v-else
      class="card p-1.5 text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-950 dark:hover:border-primary hover:border-primary cursor-pointer shadow duration-300 overflow-hidden"
    >
      <Skeleton />
    </div>
  </section>
</template>

<style scoped>
#movie_title {
  font-weight: 400;
}
</style>
