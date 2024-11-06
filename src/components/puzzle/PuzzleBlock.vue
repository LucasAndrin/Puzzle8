<script setup lang="ts">
import type { IPuzzleBlock } from '@/types/puzzle';

const props = defineProps<{
  block: IPuzzleBlock;
}>();
</script>

<template>
  <div
    v-if="block.value !== 0"
    :class="[
      'absolute flex h-8 w-8 items-center justify-center rounded transition-[top,left]',
      `left-${props.block.x * 10}`,
      `top-${props.block.y * 10}`,
    ]"
  >
    {{ props.block.value }}
  </div>
</template>
