<script setup lang="ts">
import { categories } from '~/data/categories'
import type { LightboxItem } from '~/types/project'

// Masonry (CSS columns) ছবির গ্রিড; ক্লিক করলে Lightbox খোলে।
const props = defineProps<{ items: LightboxItem[] }>()
const count = computed(() => props.items.length)
const { index, open, close, next, prev } = useLightbox(count)
</script>

<template>
  <div>
    <ul class="columns-1 gap-4 sm:columns-2 lg:columns-3">
      <li v-for="(item, i) in items" :key="i" class="mb-4 break-inside-avoid">
        <button
          type="button"
          class="group relative block w-full overflow-hidden rounded-2xl shadow-card transition-transform duration-200 hover:-translate-y-1"
          :aria-label="`ছবিটি বড় করে দেখুন: ${item.alt}`"
          @click="open(i)"
        >
          <NuxtImg
            v-if="item.src"
            :src="item.src"
            :alt="item.alt"
            :width="item.width"
            :height="item.height"
            sizes="sm:100vw md:50vw lg:380px"
            loading="lazy"
            class="skeleton h-auto w-full"
          />
          <div
            v-else
            class="relative flex w-full items-center justify-center"
            :class="categories[item.category ?? 'education'].badge"
            :style="{ aspectRatio: `${item.width ?? 3} / ${item.height ?? 2}` }"
            role="img"
            :aria-label="item.alt"
          >
            <div class="absolute inset-0 bg-linear-to-br from-white/30 to-transparent" aria-hidden="true" />
            <AppIcon :name="categories[item.category ?? 'education'].icon" :size="44" class="relative opacity-80" />
          </div>
        </button>
      </li>
    </ul>
    <Lightbox :items="items" :index="index" @close="close" @next="next" @prev="prev" />
  </div>
</template>
