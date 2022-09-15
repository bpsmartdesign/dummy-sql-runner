<script lang="ts" setup>
import type { DBTable } from '~/pages/index.vue'

interface AsideProps {
  data: DBTable[]
  hideTitle?: boolean
}

const props = withDefaults(defineProps<AsideProps>(), {
  data: undefined,
  hideTitle: false,
})
</script>

<template>
  <div v-for="table in props.data" :key="table.name" mb-8>
    <the-table :data="table" />
  </div>
</template>
