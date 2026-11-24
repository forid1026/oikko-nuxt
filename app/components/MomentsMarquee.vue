<script setup lang="ts">
import { categories } from '~/data/categories'
import { gallery } from '~/data/gallery'

// "কাজের মুহূর্ত": ছবির ফিতা ধীরে নিজে নিজে সরে; hover বা focus করলে থামে; reduced-motion হলে স্থির ও হাতে scroll।
// দ্বিতীয় কপিটি শুধু অসীম ঘূর্ণনের জন্য, স্ক্রিন রিডার থেকে লুকানো।
const items = gallery
</script>

<template>
  <div class="marquee overflow-hidden" role="region" aria-label="কাজের মুহূর্তের ছবি">
    <div class="track flex w-max gap-4 py-2">
      <template v-for="copy in 2" :key="copy">
        <NuxtLink
          v-for="g in items"
          :key="`${copy}-${g.id}`"
          to="/gallery"
          class="group relative block h-40 w-60 shrink-0 overflow-hidden rounded-2xl shadow-card sm:h-48 sm:w-72"
          :tabindex="copy === 2 ? -1 : undefined"
          :aria-hidden="copy === 2 ? 'true' : undefined"
        >
          <NuxtImg v-if="g.src" :src="g.src" :alt="copy === 1 ? g.alt : ''" width="288" height="192" loading="lazy" class="skeleton h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div
            v-else
            class="relative flex h-full w-full items-center justify-center"
            :class="categories[g.category].badge"
            role="img"
            :aria-label="copy === 1 ? g.alt : undefined"
          >
            <div class="absolute inset-0 bg-linear-to-br from-white/30 to-transparent" aria-hidden="true" />
            <AppIcon :name="categories[g.category].icon" :size="44" class="relative opacity-80 transition-transform duration-700 group-hover:scale-110" />
          </div>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<style scoped>
.track {
  animation: marquee 60s linear infinite;
}
.marquee:hover .track,
.marquee:focus-within .track {
  animation-play-state: paused;
}
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
/* gap-4 (১rem) ধরে দুই কপির মাঝের ফাঁক মিলিয়ে নিখুঁত লুপ: অর্ধেক প্রস্থ + অর্ধেক gap */
@media (prefers-reduced-motion: reduce) {
  .marquee {
    overflow-x: auto;
  }
  .track {
    animation: none;
  }
}
</style>
