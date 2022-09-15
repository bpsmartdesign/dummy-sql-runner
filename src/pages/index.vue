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
  {
    name: 'Clients',
    tableView: true,
    columns: [
      { label: 'clientId', type: 'int' },
      { label: 'firstName', type: 'varchar', length: 100 },
      { label: 'lastName', type: 'varchar', length: 100 },
      { label: 'age', type: 'integer', length: 11 },
      { label: 'country', type: 'varchar', length: 100 },
    ],
    values: [
      { clientId: 1, firstName: 'John', lastName: 'DOE', age: 23, country: 'UK' },
      { clientId: 2, firstName: 'Janette', lastName: 'DOE', age: 19, country: 'USA' },
      { clientId: 3, firstName: 'Elise', lastName: 'DOE', age: 16, country: 'USA' },
      { clientId: 4, firstName: 'Ekanga', lastName: 'Alain', age: 25, country: 'CMR' },
      { clientId: 5, firstName: 'Jordan', lastName: 'DOE', age: 32, country: 'UK' },
    ],
  },
])

/**
 * sync view output or tables on small screens
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
const mViewOutput = ref<boolean>(true)

/**
 * Set the current view
 * @param {boolean} string the new mViewOutput value
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
const setViewOutput = (val: boolean) => {
  mViewOutput.value = val
}

/**
 * Randomly return a custom output
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
const getRandomOutput = () => {
  const randomTable = _tables.value[~~(Math.random() * _tables.value.length)]
  const randomId = ~~(Math.random() * (randomTable.values.length)) + 1

  return { ...randomTable, values: randomTable.values.slice(0, randomId) }
}

/**
 * The random sql output
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
const randomOutput = ref<DBTable>(getRandomOutput())

/**
 * Set the random output
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
const setRandomOutput = () => {
  randomOutput.value = getRandomOutput()
}

/**
 * The current code editor content
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
const _code = ref<string>(`SELECT * FROM ${randomOutput.value.name}`)
</script>

<template>
  <div sm:block md:flex class="el--main_container" style="height: 92vh">
    <main sm:w-full h-full class="md:w-3/5">
      <section style="height: 55vh" dark:bg-dark-4 bg-gray-3>
        <editor
          language="sql"
          :code="_code"
          @run-command="setRandomOutput"
        />
      </section>
      <section style="height: 37vh">
        <div flex h-full items-center gap-8 px-8 py-4 dark:border-b-dark-3 border-b-gray-2 border-b border-b-solid style="height: 6vh">
          <h3 cursor-pointer hover:border-b-solid hover:border-b @click="setViewOutput(true)">
            Output
          </h3>
          <h3 sm:block md:hidden cursor-pointer hover:border-b-solid hover:border-b @click="setViewOutput(false)">
            Current Tables
          </h3>
        </div>
        <div sm:block md:hidden style="height: 31vh" overflow-y-auto px-8 py-4>
          <the-table v-if="mViewOutput" :data="randomOutput" />
          <table-list v-else sm:block md:hidden :data="_tables" />
        </div>
        <div sm:hidden md:block style="height: 31vh" overflow-y-auto px-8 py-4>
          <the-table :data="randomOutput" />
        </div>
      </section>
    </main>
    <aside h-full border-l border-l-solid dark:border-l-dark-3 border-l-gray-2 sm:w-full class="md:w-2/5">
      <h1 dark:bg-dark-4 font-bold px-8 py-3 style="height: 50px">
        Current Tables
      </h1>
      <div px-8 py-4>
        <table-list :data="_tables" />
      </div>
    </aside>
  </div>
</template>
