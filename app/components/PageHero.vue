<script setup lang="ts">
import type { Crumb } from './Breadcrumb.vue'

// ভেতরের পেজের উপরের নীল banner: ভেতরে সেলাই-ফ্রেম, ডানে চার রঙের কাঁথা-টুকরো (শুধু বড় পর্দায়)।
defineProps<{ title: string; subtitle?: string; eyebrow?: string; crumbs?: Crumb[] }>()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-blue text-white">
    <span class="stitch-frame" aria-hidden="true" />
    <div class="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-sky/40 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -bottom-32 right-0 -z-10 h-80 w-80 rounded-full bg-blue-900/70 blur-3xl" aria-hidden="true" />

    <!-- কাঁথার টুকরো: সাজসজ্জা, স্ক্রিন-রিডারে লুকানো -->
    <div class="pointer-events-none absolute bottom-10 right-10 hidden gap-3 lg:grid lg:grid-cols-2" aria-hidden="true">
      <span class="h-20 w-20 rotate-[-4deg] rounded-2xl bg-orange" />
      <span class="mt-4 h-20 w-20 rotate-[3deg] rounded-2xl bg-sky" />
      <span class="h-20 w-20 rotate-[2deg] rounded-2xl bg-green" />
      <span class="mt-4 h-20 w-20 rotate-[-3deg] rounded-2xl bg-pink" />
    </div>

    <div class="container-page py-16 md:py-24">
      <Breadcrumb v-if="crumbs?.length" :items="crumbs" dark class="mb-6" />
      <p v-if="eyebrow" class="mb-2 font-semibold text-white/90">{{ eyebrow }}</p>
      <h1 class="balance !text-white">{{ title }}</h1>
      <p v-if="subtitle" class="mt-4 max-w-2xl text-lg text-white/90">{{ subtitle }}</p>
      <slot />
    </div>
    <span class="stitch absolute inset-x-0 bottom-0 !h-1.5 !rounded-none" aria-hidden="true" />
  </section>
</template>
