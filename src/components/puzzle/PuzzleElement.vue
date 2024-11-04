<script setup lang="ts">
import type { IPuzzleBlock } from '@/assets/ts/puzzle';

const props = defineProps<{
  element: IPuzzleBlock;
}>();
</script>

<template>
  <div
    v-if="element.value !== 0"
    :class="[
      'absolute flex h-8 w-8 items-center justify-center rounded bg-indigo-500 transition-[top,left]',
      `left-${props.element.xAxis * 10}`,
      `top-${props.element.yAxis * 10}`,
    ]"
  >
    {{ props.element.value }}
  </div>
</template>
