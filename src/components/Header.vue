<script lang="ts" setup>
import { getImgUrl } from '~/utils'
</script>

<template>
  <header sm:px-3 md:px-10 flex items-center justify-between bg-white dark:bg-dark-9 dark:border-b-dark-3 dark:border-b border-b-solid style="height: 8vh" class="el--shadow_lg">
    <div flex items-center h-full>
      <img :src="getImgUrl('logo.png')" alt="bpsmartdesign" p-1 dark:bg-dark-7 bg-gray-2 rounded-2 style="height: 60%">
      <h3 ml-4 sm:hidden md:inline-block md:text-xl font-black sm:text-lg text-orange-6>
        Dummy SQL runner <span font-200 ml-2 text-xs underline underline-solid text-orange-4>by <a href="https://bpsmartdesign.tk">bpsmartdesign</a></span>
      </h3>
    </div>
    <div flex items-center gap-2>
      <button p-2 rounded flex items-center justify-center dark:text-gray-5 text-gray-9 dark:bg-dark-7 bg-gray-2 icon-btn @click="toggleDark()">
        <div dark:i-carbon-worship-muslim i-carbon-sun />
      </button>
      <a
        icon-btn i-carbon-logo-github
        rel="noreferrer"
        href="https://github.com/bpsmartdesign/dummy-sql-runner"
        target="_blank"
        title="View GitHub repository"
      />
    </div>
  </header>
</template>
