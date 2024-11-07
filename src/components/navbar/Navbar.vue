<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <RouterLink
            :to="{ name: 'home' }"
            class="flex flex-shrink-0 items-center"
          >
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
