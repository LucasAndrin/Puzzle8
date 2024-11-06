<script setup lang="ts">
import type { IPuzzleBlock } from '@/types/puzzle';
import { onUpdated } from 'vue';

const props = defineProps<{
  block: IPuzzleBlock;
}>();

onUpdated(() => {
  console.log('Updated block: ', props.block.value);
});
</script>

<template>
  <div
    v-if="props.block.value"
    :class="[
      'absolute flex h-8 w-8 items-center justify-center rounded transition-[top,left]',
      `left-${props.block.x * 10} top-${props.block.y * 10}`,
    ]"
  >
    {{ props.block.value }}
  </div>
</template>
