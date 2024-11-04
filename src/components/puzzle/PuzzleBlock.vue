<script setup lang="ts">
import type { IPuzzleBlock } from '@/assets/ts/puzzle';

const props = defineProps<{
  block: IPuzzleBlock;
}>();
</script>

<template>
  <div
    v-if="block.value !== 0"
    :class="[
      'absolute h-8 w-8 transition-[top,left]',
      `left-${props.block.xAxis * 10}`,
      `top-${props.block.yAxis * 10}`,
    ]"
  >
    {{ props.block.value }}
  </div>
</template>
