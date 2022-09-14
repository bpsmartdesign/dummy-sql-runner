<script lang="ts" setup>
import { getImgUrl } from '~/utils'
</script>

<template>
  <header px-10 flex items-center bg-white dark:bg-dark-9 dark:border-b-dark-3 dark:border-b border-b-solid style="height: 8vh" class="el--shadow_lg">
    <img :src="getImgUrl('logo.png')" alt="bpsmartdesign" p-1 dark:bg-dark-7 bg-dark-1 rounded-2 style="height: 60%">
    <h3 ml-4 md:text-xl font-black sm:text-lg text-orange-6>
      Dummy SQL runner <span font-200 sm:hidden md:inline-block ml-2 text-xs underline underline-solid text-orange-4>by <a href="https://bpsmartdesign.tk">bpsmartdesign</a></span>
    </h3>
  </header>
</template>
