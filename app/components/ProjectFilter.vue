<script setup lang="ts">
import { categories, categoryOrder } from '~/data/categories'
import type { CategoryFilter } from '~/composables/useProjectFilter'

defineProps<{ category: CategoryFilter; query: string; counts: Record<string, number> }>()
defineEmits<{ 'update:category': [value: CategoryFilter]; 'update:query': [value: string] }>()

const tabs: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: 'সব' },
  ...categoryOrder.map((k) => ({ key: k as CategoryFilter, label: categories[k].label })),
]
</script>

<template>
  <div class="space-y-5">
    <div class="relative max-w-md">
      <label for="project-search" class="sr-only">প্রকল্প খুঁজুন</label>
      <AppIcon name="search" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/60" />
      <input
        id="project-search"
        type="search"
        :value="query"
        placeholder="প্রকল্পের নাম দিয়ে খুঁজুন"
        class="w-full rounded-full border border-blue/20 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue focus:ring-2 focus:ring-sky"
        @input="$emit('update:query', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <div class="flex flex-wrap gap-2" role="group" aria-label="ক্যাটাগরি অনুযায়ী ফিল্টার">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="rounded-full border-2 px-4 py-2 font-medium transition-colors duration-200"
        :class="category === tab.key ? 'border-blue bg-blue text-white' : 'border-blue/20 bg-white text-navy hover:border-blue'"
        :aria-pressed="category === tab.key"
        @click="$emit('update:category', tab.key)"
      >
        {{ tab.label }}
        <span class="ml-1 text-sm opacity-80">({{ toBn(counts[tab.key] ?? 0) }})</span>
      </button>
    </div>
  </div>
</template>
