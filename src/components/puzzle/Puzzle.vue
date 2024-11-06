<script setup lang="ts">
import type { IPuzzle, IPuzzleBlock } from '@/types/puzzle';

import { computed } from 'vue';

const props = defineProps<{
  data: IPuzzle;
}>();

const blocks = computed<IPuzzleBlock[]>(() => {
  return props.data.flatMap((row, y) =>
    row.map((value, x) => {
      return { value, x, y };
    }),
  );
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
      <slot
        v-for="block in blocks"
        :key="props.data.length * block.y + block.x"
        :block
      />
    </div>
  </div>
</template>
