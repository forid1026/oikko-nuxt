<script setup lang="ts">
// পেজের শেষের নীল আহ্বান-বার। বাটনের লেখা ও লিংক বদলানো যায়।
withDefaults(
  defineProps<{ title?: string; text?: string; buttonLabel?: string; to?: string; donate?: boolean }>(),
  {
    title: 'আজই একজন মানুষের পাশে দাঁড়ান',
    text: 'আপনার ছোট একটি সহায়তাও একজনের জীবনে বড় পরিবর্তন আনতে পারে।',
    buttonLabel: 'দান করুন',
    to: '/donate',
    donate: true,
  },
)
</script>

<template>
  <section class="relative isolate overflow-hidden bg-blue text-white">
    <span class="stitch-frame" aria-hidden="true" />
    <div class="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-sky/30 blur-3xl" aria-hidden="true" />
    <div class="container-page flex flex-col items-center gap-6 py-16 text-center md:py-20">
      <h2 class="max-w-2xl !text-white">{{ title }}</h2>
      <p class="max-w-xl text-lg text-white/90">{{ text }}</p>
      <div class="flex flex-wrap justify-center gap-3">
        <NuxtLink :to="to" class="btn" :class="donate ? 'btn-donate' : 'bg-white text-blue hover:bg-surface'">
          <AppIcon v-if="donate" name="heart" :size="18" /> {{ buttonLabel }}
        </NuxtLink>
        <slot />
      </div>
    </div>
  </section>
</template>
