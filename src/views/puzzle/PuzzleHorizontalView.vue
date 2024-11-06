<script setup lang="ts">
import type { IPuzzle } from '@/types/puzzle';

import { ref } from 'vue';

/** Components */
import Puzzle from '@/components/puzzle/Puzzle.vue';
import PuzzleBlock from '@/components/puzzle/PuzzleBlock.vue';

/** Assets */
import { horizontalSearch, toggleBlockOf } from '@/assets/ts/horizontal-search';

const start = ref<IPuzzle>([
  [4, 3, 6],
  [8, 7, 1],
  [0, 5, 2],
]);

const end = ref<IPuzzle>([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
]);

function resolve() {
  console.log(horizontalSearch(start.value, end.value));
}
</script>

<template>
  <div class="flex flex-col gap-3 place-self-center">
    <div class="text-dark flex flex-row gap-3 dark:text-white">
      <div class="flex flex-col">
        <h4>Start</h4>

        <Puzzle
          v-slot="{ block }"
          class="bg-white dark:bg-slate-800"
          :data="start"
        >
          <PuzzleBlock
            class="bg-indigo-500"
            :block
            @click="toggleBlockOf(start, block.value)"
          />
        </Puzzle>
      </div>

      <div class="flex flex-col">
        <h4>Target</h4>

        <Puzzle
          v-slot="{ block }"
          class="bg-white dark:bg-slate-800"
          :data="end"
        >
          <PuzzleBlock
            class="bg-indigo-500"
            :block
            @click="toggleBlockOf(end, block.value)"
          />
        </Puzzle>
      </div>
    </div>

    <button class="rounded bg-indigo-500 p-1 text-white" @click="resolve">
      Resolve
    </button>
  </div>
</template>
