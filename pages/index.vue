<script setup>
import BottomNav from "~/components/bottomNav.vue";

const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  scrollToTop();
});
</script>

<template>
  <section id="home-page" class="dark:bg-zinc-950">
    <Carousel />
    <div class="flex lg:items-start gap-10 items-center xl:px-36 px-3">
      <sectionsLastestMovie class="lg:w-[70%]" />
      <Sidebar class="w-[30%]" />
    </div>
    <div class="flex lg:items-start gap-10 items-center xl:px-36 p-3">
      <SectionsUpcomingMovie class="lg:w-[70%]" />
      <Sidebar class="w-[30%]" />
    </div>
    <bottomNav />
  </section>
</template>
