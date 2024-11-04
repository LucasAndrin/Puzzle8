<script setup lang="ts">
import { RouterLink, type RouterLinkProps } from 'vue-router';

const props = defineProps<RouterLinkProps>();
</script>

<template>
  <RouterLink
    v-bind="props"
    class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
    active-class="bg-gray-900 text-white"
  >
    <slot />
  </RouterLink>
</template>
