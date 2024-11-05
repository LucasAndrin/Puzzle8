<script setup lang="ts">
import type { IPuzzleBlock } from '@/assets/ts/puzzle';

import { computed } from 'vue';

const props = defineProps<{
  data: IPuzzleBlock[];
}>();

const size = computed(() => {
  return Math.sqrt(props.data.length) * 12;
});
</script>

<template>
  <div :class="`h-${size} w-${size}`">
    <div class="relative">
      <template v-for="block in props.data" :key="block.value">
        <slot :block />
      </template>
    </div>
  </div>
</template>
