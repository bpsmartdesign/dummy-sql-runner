<script lang="ts" setup>
import { ref } from 'vue'

/**
 * The Database column data type.
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
interface DBColumn {
  label: string
  type: string
  length?: number
}

/**
 * The Database Table data type.
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
interface DBTable {
  name: string
  tableView: boolean
  columns: DBColumn[]
  values: any[]
}

/**
 * The list of all current tables
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
const _tables = ref<DBTable[]>([
  {
    name: 'categories',
    tableView: true,
    columns: [
      { label: 'categoryId', type: 'int' },
      { label: 'categoryName', type: 'varchar', length: 100 },
      { label: 'description', type: 'text' },
      { label: 'picture', type: 'varchar', length: 100 },
    ],
    values: [
      { categoryId: 1, categoryName: 'Beverages', description: 'Soft drinks coffees', picture: 'img-1' },
      { categoryId: 2, categoryName: 'Condiments', description: 'Sweet sauces', picture: 'img-2' },
      { categoryId: 3, categoryName: 'Confections', description: 'Desserts candies', picture: 'img-3' },
      { categoryId: 4, categoryName: 'Dairy Products', description: 'Cheeses', picture: 'img-4' },
      { categoryId: 5, categoryName: 'Grains/Cereals', description: 'Breads crackers', picture: 'img-5' },
    ],
  },
  {
    name: 'Orders',
    tableView: true,
    columns: [
      { label: 'orderId', type: 'int' },
      { label: 'item', type: 'varchar', length: 100 },
      { label: 'amount', type: 'integer', length: 11 },
      { label: 'categoryId', type: 'integer', length: 11 },
    ],
    values: [
      { orderId: 1, item: 'Fruit salad', amount: 400, categoryId: 3 },
      { orderId: 2, item: 'Chicken', amount: 750, categoryId: 1 },
      { orderId: 3, item: 'Tomatoes', amount: 300, categoryId: 1 },
      { orderId: 4, item: '4 Cups of tea', amount: 1500, categoryId: 5 },
      { orderId: 5, item: '3 bred', amount: 50, categoryId: 2 },
    ],
  },
])
</script>

<template>
  <div sm:block md:flex class="el--main_container" style="height: 92vh">
    <main sm:w-full h-full class="md:w-3/5">
      <section>
        <h3>Add SQL query</h3>
      </section>
    </main>
    <aside h-full dark:border-l dark:border-l-solid dark:border-l-dark-3 sm:w-full class="md:w-2/5">
      <h1 dark:bg-dark-4 font-bold px-8 py-3>
        Current Tables
      </h1>
      <div px-8 py-4>
        <div v-for="table in _tables" :key="table.name" mb-8>
          <h3 text-sm mb-2 flex items-center justify-between>
            <span>
              {{ table.name }}
            </span>
            <div grid grid-cols-2>
              <button p-2 flex items-center justify-center icon-btn :class="{ 'dark:bg-dark-9 bg-gray-3 dark-text-gray-7 text-gray-8': table.tableView, 'dark:text-gray-5 text-gray-7 dark:bg-dark-7 bg-gray-1': !table.tableView }" @click="table.tableView = !table.tableView">
                <div i-carbon-table-shortcut />
              </button>
              <button p-2 flex items-center justify-center icon-btn :class="{ 'dark:bg-dark-9 bg-gray-3 dark-text-gray-7 text-gray-8': !table.tableView, 'dark:text-gray-5 text-gray-7 dark:bg-dark-7 bg-gray-1': table.tableView }" @click="table.tableView = !table.tableView">
                <div i-carbon-license-maintenance />
              </button>
            </div>
          </h3>
          <div v-if="table.tableView" overflow-x-auto>
            <table>
              <thead>
                <tr>
                  <th v-for="head in table.columns" :key="head.label" dark:border-dark-3 border-gray-2 dark:bg-dark-3 bg-gray-2>
                    {{ head.label }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in table.values" :key="item.id">
                  <td v-for="head in table.columns" :key="head.label" dark:border-dark-3 border-gray-2>
                    {{ item[head.label] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else border-l border-l-solid pl-6 relative>
            <p v-for="head in table.columns" :key="head.label" my-3 text-xs>
              {{ head.label }}
              <span text-orange-600>[{{ head.type }}<span v-if="head.length"> ({{ head.length }})</span>]</span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>
