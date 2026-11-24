<script setup lang="ts">
import { categories, type ProjectCategory } from '~/data/categories'

// ছবি থাকলে @nuxt/image দিয়ে lazy-load; না থাকলে ক্যাটাগরির রঙের gradient + আইকন (placeholder)।
const props = withDefaults(
  defineProps<{
    src?: string
    alt: string
    category?: ProjectCategory
    /** CSS aspect-ratio, যেমন "16 / 10" */
    ratio?: string
    sizes?: string
    eager?: boolean
  }>(),
  { ratio: '16 / 10', sizes: 'sm:100vw md:50vw lg:400px' },
)
const meta = computed(() => categories[props.category ?? 'education'])
</script>

<template>
  <div class="skeleton relative overflow-hidden" :style="{ aspectRatio: ratio }">
    <NuxtImg
      v-if="src"
      :src="src"
      :alt="alt"
      :sizes="sizes"
      :loading="eager ? 'eager' : 'lazy'"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div v-else class="absolute inset-0 flex items-center justify-center" :class="meta.badge" role="img" :aria-label="alt">
      <div class="absolute inset-0 bg-linear-to-br from-white/30 to-transparent" aria-hidden="true" />
      <AppIcon :name="meta.icon" :size="56" class="relative opacity-80 transition-transform duration-700 group-hover:scale-110" />
    </div>
  </div>
</template>
