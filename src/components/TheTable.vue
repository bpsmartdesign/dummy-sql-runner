<script lang="ts" setup>
import type { DBTable } from '~/pages/index.vue'

interface AsideProps {
  data: DBTable
}

const props = withDefaults(defineProps<AsideProps>(), {
  data: undefined,
})

const isTableView = ref<boolean>(true)
const toggleView = () => {
  isTableView.value = !isTableView.value
}
</script>

<template>
  <h3 text-sm mb-2 flex items-center justify-between>
    <span>
      {{ props.data.name }}
    </span>
    <div grid grid-cols-2>
      <button p-2 flex items-center justify-center icon-btn :class="{ 'dark:bg-dark-9 bg-gray-3 dark-text-gray-7 text-gray-8': isTableView, 'dark:text-gray-5 text-gray-7 dark:bg-dark-7 bg-gray-1': !isTableView }" @click="toggleView()">
        <div i-carbon-table-shortcut />
      </button>
      <button p-2 flex items-center justify-center icon-btn :class="{ 'dark:bg-dark-9 bg-gray-3 dark-text-gray-7 text-gray-8': !isTableView, 'dark:text-gray-5 text-gray-7 dark:bg-dark-7 bg-gray-1': isTableView }" @click="toggleView()">
        <div i-carbon-license-maintenance />
      </button>
    </div>
  </h3>
  <div v-if="isTableView" overflow-x-auto>
    <table>
      <thead>
        <tr>
          <th v-for="head in props.data.columns" :key="head.label" dark:border-dark-3 border-gray-2 dark:bg-dark-3 bg-gray-2>
            {{ head.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.data.values" :key="item.id">
          <td v-for="head in props.data.columns" :key="head.label" dark:border-dark-3 border-gray-2>
            {{ item[head.label] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else border-l border-l-solid pl-6 relative>
    <p v-for="head in props.data.columns" :key="head.label" my-3 text-xs>
      {{ head.label }}
      <span text-orange-600>[{{ head.type }}<span v-if="head.length"> ({{ head.length }})</span>]</span>
    </p>
  </div>
</template>
