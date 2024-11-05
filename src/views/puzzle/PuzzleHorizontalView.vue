<script setup lang="ts">
import { ref } from 'vue';
import { cloneDeep } from 'lodash';
import {
  findHorizontalSequence,
  getPuzzleWeight,
  moveBlock,
  type IPuzzleBlock,
} from '@/assets/ts/puzzle';
import Puzzle from '@/components/puzzle/Puzzle.vue';
import PuzzleBlock from '@/components/puzzle/PuzzleBlock.vue';

const start = ref<IPuzzleBlock[]>([
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

const end = ref<IPuzzleBlock[]>(cloneDeep(start.value));

function resolve() {
  console.log(findHorizontalSequence(start.value, end.value));
}
</script>

<template>
  <div class="flex flex-col gap-3 place-self-center">
    <div class="text-dark flex flex-row gap-3 dark:text-white">
      <div class="flex flex-col">
        <h4>Start</h4>
        <span>Weight: {{ getPuzzleWeight(start) }}</span>

        <Puzzle
          v-slot="{ block }"
          class="rounded-lg bg-white p-4 shadow-xl dark:bg-slate-800"
          :data="start"
        >
          <PuzzleBlock
            class="flex items-center justify-center rounded bg-indigo-500"
            :block
            @click="moveBlock(start, block.value)"
          />
        </Puzzle>
      </div>

      <div class="flex flex-col">
        <h4>Target</h4>
        <span>Weight: {{ getPuzzleWeight(end) }}</span>

        <Puzzle
          v-slot="{ block }"
          class="rounded-lg bg-white p-4 shadow-xl dark:bg-slate-800"
          :data="end"
        >
          <PuzzleBlock
            class="flex items-center justify-center rounded bg-indigo-500"
            :block
            @click="moveBlock(end, block.value)"
          />
        </Puzzle>
      </div>
    </div>

    <button class="rounded bg-indigo-500 p-1 text-white" @click="resolve">
      Resolve
    </button>
  </div>
</template>
