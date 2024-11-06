<script setup lang="ts">
import type { IPuzzle, IPuzzleBlock } from '@/types/puzzle';

import { ref, watchEffect } from 'vue';
import merge from 'lodash/merge';

/** Components */
import PuzzleBlock from './PuzzleBlock.vue';

const props = defineProps<{
  data: IPuzzle;
}>();

const blocks = ref<IPuzzleBlock[]>([]);
watchEffect(() => {
  console.log('changed');
  props.data.forEach((row, y) => {
    row.forEach((value, x) => {
      const block = blocks.value.find(b => b.value === value);
      if (block) {
        merge(block, { x, y });
      } else {
        blocks.value.push({ value, x, y });
      }
    });
  });
});
</script>

<template>
  <div
    :class="[
      'rounded-lg bg-white p-4 shadow-xl dark:bg-slate-800',
      `h-${data.length * 12} w-${data.length * 12}`,
    ]"
  >
    <div class="relative">
      <template v-if="$slots.default">
        <slot v-for="block in blocks" :key="block.value" :block />
      </template>

      <PuzzleBlock v-for="block in blocks" v-else :key="block.value" :block />
    </div>
  </div>
</template>
