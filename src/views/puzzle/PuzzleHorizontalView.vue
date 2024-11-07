<script setup lang="ts">
import type { IPuzzle } from '@/types/puzzle';
import { ref } from 'vue';

/** Components */
import Puzzle from '@/components/puzzle/Puzzle.vue';
import PuzzleBlock from '@/components/puzzle/PuzzleBlock.vue';

/** Assets */
import { horizontalSearch } from '@/assets/ts/horizontal-search';
import { heuristicSearch } from '@/assets/ts/heuristic-search';

import { animate, toggleBlockOf } from '@/assets/ts/puzzle';

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

const time = ref<number>();
const result = ref<IPuzzle>();
const loading = ref(false);
function solve(method: (start: IPuzzle, end: IPuzzle) => Promise<IPuzzle[]>) {
  loading.value = true;
  const startTime = performance.now();
  method(start.value, end.value)
    .then(path => {
      animate(path, result);
      time.value = performance.now() - startTime;
    })
    .catch(message => {
      alert(message);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <div class="text-dark flex flex-col gap-3 dark:text-white">
    <div class="flex flex-row justify-center gap-3">
      <div class="flex flex-col gap-2">
        <h4>Start</h4>

        <Puzzle v-slot="{ block }" :data="start">
          <PuzzleBlock
            :block
            class="cursor-pointer"
            @click="toggleBlockOf(start, block.value)"
          />
        </Puzzle>
        <button
          class="flex rounded bg-indigo-500 p-1 px-9 text-white"
          @click="solve(heuristicSearch)"
        >
          Heuristic
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <h4>Target</h4>

        <Puzzle v-slot="{ block }" :data="end">
          <PuzzleBlock
            :block
            class="cursor-pointer"
            @click="toggleBlockOf(end, block.value)"
          />
        </Puzzle>
        <div class="flex flex-row justify-center gap-3">
          <button
            class="flex rounded bg-indigo-500 p-1 px-9 text-white"
            @click="solve(horizontalSearch)"
          >
            Horizontal
          </button>
        </div>
      </div>
    </div>
    <template v-if="loading">Thinking...</template>
    <Puzzle v-else-if="result" :data="result" class="self-center" />
    <template v-if="time">
      <p class="text-center">Tempo: {{ time }}ms</p>
    </template>
  </div>
</template>
