<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from '@/components/navbar/Navbar.vue';
</script>

<template>
  <Navbar />

  <div class="flex-grow p-10">
    <RouterView />
  </div>
</template>
