<script lang="ts" setup>
import { ref } from 'vue'

/**
 * The Database column data type.
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
export interface DBColumn {
  label: string
  type: string
  length?: number
}

/**
 * The Database Table data type.
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
export interface DBTable {
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

const getRandomTable = () => _tables.value[~~(Math.random() * _tables.value.length)]
</script>

<template>
  <div sm:block md:flex class="el--main_container" style="height: 92vh">
    <main sm:w-full h-full class="md:w-3/5">
      <section style="height: 55vh" bg-red-9 px-8 py-4>
        <h3>Add SQL query</h3>
      </section>
      <section style="height: 37vh">
        <div flex h-full items-center gap-8 px-8 py-4 dark:border-b-dark-3 border-b-gray-2 border-b border-b-solid style="height: 6vh">
          <h3 cursor-pointer hover:border-b-solid hover:border-b>
            Output
          </h3>
          <h3 sm:block md:hidden cursor-pointer hover:border-b-solid hover:border-b>
            Current Tables
          </h3>
        </div>
        <div style="height: 31vh" overflow-y-auto px-8 py-4>
          <the-table :data="getRandomTable()" />
          <table-list sm:block md:hidden :data="_tables" />
        </div>
      </section>
    </main>
    <aside h-full border-l border-l-solid dark:border-l-dark-3 border-l-gray-2 sm:w-full class="md:w-2/5">
      <h1 dark:bg-dark-4 font-bold px-8 py-3>
        Current Tables
      </h1>
      <div px-8 py-4>
        <table-list :data="_tables" />
      </div>
    </aside>
  </div>
</template>
