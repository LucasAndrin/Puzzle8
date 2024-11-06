<script setup lang="ts">
import type { IPuzzle, IPuzzleBlock } from '@/types/puzzle';

import { computed } from 'vue';

const props = defineProps<{
  data: IPuzzle;
}>();

const blocks = computed(() => {
  // const map: IPuzzleBlockMap = new Map();
  const map: IPuzzleBlock[] = [];
  console.log(props.data);
  props.data.forEach((row, y) => {
    row.forEach((value, x) => {
      map.push({ value, x, y });
      // map.set(value, { value, x, y });
    });
  });

  return map;
});
</script>

<template>
  <div
    :class="[
      'rounded-lg p-4 shadow-xl',
      `h-${data.length * 12} w-${data.length * 12}`,
    ]"
  >
    <div class="relative">
      <slot v-for="block in blocks" :key="block.value" :block />
    </div>
  </div>
</template>
