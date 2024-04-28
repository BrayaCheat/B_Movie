<script setup>
const { movieData } = defineProps(["movieData"]);

const getImage = (imgName) => {
  return "https://image.tmdb.org/t/p/original" + imgName;
};
</script>

<template>
  <section id="mini-card"
  v-if="movieData"
  >
    <UTooltip
    :text="movieData.title"
    >
      <NuxtLink
        :to="`/Detail/${movieData.id}`"
        class="overflow-hidden flex items-center gap-6 text-sm text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 pe-6 ps-2 py-2 border border-gray-200 dark:border-gray-950 dark:bg-gray-900 bg-gray-200 rounded shadow hover:border-primary dark:hover:border-primary duration-300"
      >
        <img :src="getImage(movieData.poster_path)" class="w-8" />
        <div class="flex flex-col">
          <div class="flex items-center gap-2 text-xs font-light">
            <h1>HD</h1>
            <h1>PG-13</h1>
            <h1>2024</h1>
            <h1>166 min</h1>
          </div>
          <h1 class="text-sm">{{ (movieData.original_title).slice(0,15) }}</h1>
        </div>
      </NuxtLink>
    </UTooltip>
  </section>
  <!-- loading... -->
  <section v-else class="flex items-center space-x-4">
    <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
    <div class="space-y-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
  </section>
</template>
