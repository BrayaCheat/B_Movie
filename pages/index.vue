<script setup>
import BottomNav from '~/components/bottomNav.vue';
</script>

<template>
  <section id="home-page">
    <Carousel/>
    <div class="flex lg:items-start gap-10 items-center lg:px-36 px-3">
      <sectionsLastestMovie class="lg:w-[70%]"/>
      <Sidebar class="w-[30%]"/>
    </div>
    <div class="flex lg:items-start gap-10 items-center lg:px-36 p-3">
      <SectionsUpcomingMovie class="lg:w-[70%]"/>
      <Sidebar class="w-[30%]"/>
    </div>
    <bottomNav/>
  </section>
</template>
