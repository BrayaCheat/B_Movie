<script setup>
const { movie } = defineProps(["movie"]);
const image_url = "https://image.tmdb.org/t/p/w500";
const toast = useToast();

const getDetailMovie = async () => {
  try {
    const response = await $fetch("/api/detail", {
      method: "POST",
      body: {
        id: movie.id,
      },
    });
    detailMovie.value = response;
    console.log(detailMovie.value);
  } catch (error) {
    console.log(error);
  }
};

const detailMovie = ref();

const addToBookMark = (movieName, movieName1) => {
  toast.add({
    title: `Bookmark Added!`,
    description: `${movieName || movieName1}`,
    icon: "i-heroicons-check-badge",
  });
};
const getImage = (imagePath) => {
  return image_url + imagePath;
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

onMounted(() => {
  getDetailMovie();
});
</script>

<template>
  <section id="movie-card">
    <div
      v-if="detailMovie"
      class="card p-1.5 text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-950 dark:hover:border-primary hover:border-primary cursor-pointer shadow duration-300 overflow-hidden"
    >
      <!-- <div class="flex items-center justify-between w-full">
        <UButton
          :label="'' || movie.vote_average.toFixed(1)"
          color="gray"
          variant="ghost"
          icon="i-heroicons-star-20-solid"
          class="ps-0"
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
                  addToBookMark(movie.original_title, movie.original_name)
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
      </div> -->
      <NuxtLink
        :to="`/Detail/${detailMovie.id}`"
        class="grid place-items-center gap-3"
      >       
          <img
            :src="getImage(detailMovie.poster_path)"
            class="object-cover rounded-md"
          />
        <UButton
          :label="`Movie - ${detailMovie.release_date.slice(0, 4)} - ${
            detailMovie.runtime
          } mins`"
          color="gray"
          class="rounded-md"
          size="xs"
        />
        <h1
          id="movie_title"
          class="md:text-sm text-xs text-black dark:text-white text-center md:h-12 h-10 mt-3"
        >
          {{ detailMovie.original_title || detailMovie.original_name }}
        </h1>
      </NuxtLink>
    </div>
    <!-- loading... -->
    <div v-else>
      <Skeleton />
    </div>
  </section>
</template>

<style scoped>
#movie_title {
  font-weight: 400;
}
</style>
