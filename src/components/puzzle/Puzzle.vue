<script setup lang="ts">
import type { IPuzzleBlock } from '@/assets/ts/puzzle';
import PuzzleElement from '@/components/puzzle/PuzzleElement.vue';

const props = defineProps<{
  data: IPuzzleBlock[];
}>();
</script>

<template>
  <div
    class="text-dark h-36 w-36 rounded-lg bg-white p-4 shadow-xl dark:bg-slate-800 dark:text-white"
  >
    <div class="relative">
      <template v-for="el in props.data" :key="el.value">
        <PuzzleElement :element="el" />
      </template>
    </div>
  </div>
</template>
