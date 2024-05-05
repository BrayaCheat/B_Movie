<script setup>
const links = [
  [
    {
      label: "DEVELOPED BY - Braya Cheat",
    },
  ],
  [
    {
      avatar: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/50px-2023_Facebook_icon.svg.png",
      },
      to: "https://www.facebook.com/braya.cheat",
    },
    {
      avatar: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/121px-Telegram_2019_Logo.svg.png",
      },
      to: "https://t.me/brayacheat19",
    },
    {
      avatar: {
        src: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
      },
      to: "https://github.com/BrayaCheat",
    },
  ],
];
</script>

<template>
  <footer>
    <div
      class="flex items-center justify-center lg:px-36 lg:py-10 px-3 py-20 dark:bg-black bg-gray-200"
    >
      <UHorizontalNavigation
        :links="links"
        class="border-b border-gray-200 dark:border-gray-800"
      />
    </div>
  </footer>
</template>
