<script setup lang="ts">
import { ref } from 'vue';

import type { IPuzzle } from '@/assets/ts/puzzle';

/** Components */
import Puzzle from '@/components/puzzle/Puzzle.vue';
import PuzzleBlock from '@/components/puzzle/PuzzleBlock.vue';

function generatePuzzleWeight(length: number): IPuzzle {
  const puzzle: IPuzzle = [];
  for (let xAxis = 0; xAxis < length; xAxis++) {
    for (let yAxis = 0; yAxis < length; yAxis++) {
      const xValue = Math.max(xAxis + 1, length - xAxis);
      const yValue = Math.max(yAxis + 1, length - yAxis);

      puzzle.push({
        value: xValue + yValue - length,
        xAxis,
        yAxis,
      });
    }
  }

  return puzzle;
}

const data = ref(generatePuzzleWeight(3));
</script>

<template>
  <Puzzle
    class="text-dark rounded-lg bg-white p-4 shadow-xl dark:bg-slate-800 dark:text-white"
    :data
    v-slot="{ block }"
  >
    <PuzzleBlock
      :block
      class="flex items-center justify-center rounded bg-indigo-500"
    />
  </Puzzle>
</template>
