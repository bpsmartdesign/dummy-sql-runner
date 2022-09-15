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
    <div flex justify-between items-center style="height: 51px">
      <h3>SQL</h3>
      <div class="buttons">
        <button class="item" @click="handleUndo">
          Undo
        </button>
        <button class="item" @click="handleRedo">
          Redo
        </button>
      </div>
    </div>
    <div class="main">
      <Codemirror
        v-model="_code"
        :style="{
          width: '100%',
          height: config.height,
          backgroundColor: isDark ? '#1c2130' : '#ffffff',
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
