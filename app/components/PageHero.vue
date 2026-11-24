<script setup lang="ts">
import type { Crumb } from './Breadcrumb.vue'

// ভেতরের পেজের উপরের নীল banner। blur blob শুধু এখানে (ও হোম hero-তে)।
defineProps<{ title: string; subtitle?: string; eyebrow?: string; crumbs?: Crumb[] }>()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-blue text-white">
    <div class="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-sky/40 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -bottom-32 right-0 -z-10 h-80 w-80 rounded-full bg-blue-900/70 blur-3xl" aria-hidden="true" />

    <div class="container-page py-14 md:py-20">
      <Breadcrumb v-if="crumbs?.length" :items="crumbs" dark class="mb-6" />
      <p v-if="eyebrow" class="mb-2 font-semibold text-white/90">{{ eyebrow }}</p>
      <h1 class="!text-white">{{ title }}</h1>
      <p v-if="subtitle" class="mt-4 max-w-2xl text-lg text-white/90">{{ subtitle }}</p>
      <slot />
    </div>
  </section>
</template>
