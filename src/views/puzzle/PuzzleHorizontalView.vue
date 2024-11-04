<script setup lang="ts">
import { ref } from 'vue';
import { movePuzzleBlock, type IPuzzleBlock } from '@/assets/ts/puzzle';
import Puzzle from '@/components/puzzle/Puzzle.vue';
import PuzzleBlock from '@/components/puzzle/PuzzleBlock.vue';

const data = ref<IPuzzleBlock[]>([
  { value: 1, xAxis: 0, yAxis: 0 },
  { value: 2, xAxis: 1, yAxis: 0 },
  { value: 3, xAxis: 2, yAxis: 0 },
  { value: 4, xAxis: 0, yAxis: 1 },
  { value: 5, xAxis: 1, yAxis: 1 },
  { value: 6, xAxis: 2, yAxis: 1 },
  { value: 7, xAxis: 0, yAxis: 2 },
  { value: 8, xAxis: 1, yAxis: 2 },
  { value: 0, xAxis: 2, yAxis: 2 },
]);
</script>

<template>
  <div class="place-self-center">
    <button class="rounded bg-indigo-500" @click="movePuzzleBlock(data, 6)">
      test
    </button>

    <Puzzle
      v-slot="{ block }"
      class="text-dark rounded-lg bg-white p-4 shadow-xl dark:bg-slate-800 dark:text-white"
      :data
    >
      <PuzzleBlock
        class="flex items-center justify-center rounded bg-indigo-500"
        :block
      />
    </Puzzle>
  </div>
</template>
