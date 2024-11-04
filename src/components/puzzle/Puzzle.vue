<script setup lang="ts">
import type { IPuzzleBlock } from '@/assets/ts/puzzle'

const props = defineProps<{
  data: IPuzzleBlock[]
}>()
</script>

<template>
  <div class="h-36 w-36">
    <div class="relative">
      <template v-for="block in props.data" :key="block.value">
        <slot :block />
      </template>
    </div>
  </div>
</template>
