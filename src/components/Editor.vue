<script lang="ts">
import { defineComponent, onMounted, reactive, shallowRef, watch } from 'vue'
import type { EditorView, ViewUpdate } from '@codemirror/view'
import { redo, undo } from '@codemirror/commands'
import { Codemirror } from 'vue-codemirror'
import { sql } from '@codemirror/lang-sql'
// import { oneDark } from '@codemirror/theme-one-dark'

export default defineComponent({
  name: 'Editor',
  title: 'SQL dummy runner editor',
  url: import.meta.url,
  components: {
    Codemirror,
  },
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const $code = shallowRef(props.code)
    const config = reactive({
      disabled: false,
      indentWithTab: true,
      tabSize: 2,
      autofocus: true,
      height: 'calc(55vh - 80px)',
      language: sql,
    })

    const cmView = shallowRef<EditorView>()
    const handleReady = ({ view }: any) => {
      cmView.value = view
    }

    // https://github.com/codemirror/commands/blob/main/test/test-history.ts
    const handleUndo = () => {
      undo({
        state: cmView.value!.state,
        dispatch: cmView.value!.dispatch,
      })
    }

    const handleRedo = () => {
      redo({
        state: cmView.value!.state,
        dispatch: cmView.value!.dispatch,
      })
    }

    const state = reactive({
      lines: null as null | number,
      cursor: null as null | number,
      selected: null as null | number,
      length: null as null | number,
    })

    const handleStateUpdate = (viewUpdate: ViewUpdate) => {
      // selected
      const ranges = viewUpdate.state.selection.ranges
      state.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0)
      state.cursor = ranges[0].anchor
      // length
      state.length = viewUpdate.state.doc.length
      state.lines = viewUpdate.state.doc.lines
    }

    onMounted(() => {
      watch(
        () => props.code,
        (_code) => {
          $code.value = _code
        },
      )
    })

    return {
      _code: $code,
      config,
      state,
      handleReady,
      handleStateUpdate,
      handleRedo,
      handleUndo,
    }
  },
})
</script>

<template>
  <div class="editor">
    <div flex justify-between items-center style="height: 50px">
      <h3 h-full text-sm font-medium flex justify-center items-center px-8 :style="{ backgroundColor: isDark ? '#4a1e1e' : '#ffffff' }">
        Input
      </h3>
      <div w-full h-full px-8 gap-2 text-sm flex justify-end items-center border-b border-b-solid dark:border-b-dark-3 border-b-gray-2 border-l border-l-solid dark:border-l-dark-3 border-l-gray-2>
        <div grid grid-cols-2 gap-1>
          <button p-1 flex items-center justify-center icon-btn border dark:border-solid dark:border-gray-6 dark:text-gray-6 hover:dark-bg-gray-5 hover:text-dark-9 rounded @click="handleUndo">
            <div i-carbon-undo />
          </button>
          <button p-1 flex items-center justify-center icon-btn border dark:border-solid dark:border-gray-6 dark:text-gray-6 hover:dark-bg-gray-5 hover:text-dark-9 rounded @click="handleRedo">
            <div i-carbon-redo />
          </button>
        </div>
      </div>
    </div>
    <div class="main">
      <Codemirror
        v-model="_code"
        :style="{
          width: '100%',
          height: config.height,
          backgroundColor: isDark ? '#4a1e1e' : '#ffffff',
        }"
        placeholder="Please enter the code."
        mode="javascript"
        :autofocus="config.autofocus"
        :disabled="config.disabled"
        :indent-with-tab="config.indentWithTab"
        :tab-size="config.tabSize"
        @update="handleStateUpdate"
        @ready="handleReady"
      />
    </div>
    <div flex justify-end items-center text-xs gap-2 pr-8 style="height: 30px">
      <span border-r border-r-solid dark:border-r-dark-3 border-r-gray-2 pr-2 h-full flex items-center>Spaces: {{ config.tabSize }}</span>
      <span border-r border-r-solid dark:border-r-dark-3 border-r-gray-2 pr-2 h-full flex items-center>Length: {{ state.length }}</span>
      <span border-r border-r-solid dark:border-r-dark-3 border-r-gray-2 pr-2 h-full flex items-center>Lines: {{ state.lines }}</span>
      <span border-r border-r-solid dark:border-r-dark-3 border-r-gray-2 pr-2 h-full flex items-center>Cursor: {{ state.cursor }}</span>
      <span h-full flex items-center>Selected: {{ state.selected }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/assets/scss/variables.scss';

  .editor {
    .divider {
      height: 1px;
      background-color: $border-color;
    }

    .main {
      display: flex;
      width: 100%;

      .code {
        width: 30%;
        height: 100px;
        margin: 0;
        padding: 0.4em;
        overflow: scroll;
        border-left: 1px solid $border-color;
        font-family: monospace;
      }
    }
  }
</style>

<style lang="scss">
  .cm-gutters {
    background: transparent !important;
    border: none !important;

    * {
      background: transparent !important;
    }
  }

  .cm-activeLine {
    background-color: transparent !important;
  }
</style>
