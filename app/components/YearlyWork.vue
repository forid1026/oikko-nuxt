<script setup lang="ts">
import { categories } from '~/data/categories'
import type { ProjectItem } from '~/types/project'

// "বছর ধরে আমাদের কাজ": প্রকল্পের date থেকে বছর বের করে ট্যাব বানায়। হাতে লেখা কোনো তালিকা নেই,
// নতুন বছরের প্রকল্প যোগ করলে নতুন ট্যাব নিজে থেকেই আসে। কোনো প্রকল্পে বছর না থাকলে সেটি এখানে আসে না।
const props = defineProps<{ projects: ProjectItem[] }>()

const byYear = computed(() => {
  const map = new Map<number, ProjectItem[]>()
  for (const p of props.projects) {
    const y = projectYear(p.date)
    if (y !== null) map.set(y, [...(map.get(y) ?? []), p])
  }
  return map
})
const years = computed(() => [...byYear.value.keys()].sort((a, b) => b - a)) // সর্বশেষ বছর আগে

const selected = ref<number | null>(null)
const active = computed(() => selected.value ?? years.value[0] ?? null)
const items = computed(() => (active.value === null ? [] : (byYear.value.get(active.value) ?? [])))
const total = computed(() => items.value.reduce((sum, p) => sum + beneficiaryCount(p.beneficiaries), 0))

function onKey(e: KeyboardEvent) {
  const i = years.value.indexOf(active.value ?? -1)
  const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null
  if (next === null) return
  e.preventDefault()
  const y = years.value[(next + years.value.length) % years.value.length]
  if (y !== undefined) {
    selected.value = y
    nextTick(() => document.getElementById(`year-tab-${y}`)?.focus())
  }
}
</script>

<template>
  <section v-if="years.length" class="section" aria-labelledby="yearly-title">
    <div class="container-page">
      <SectionHeading id="yearly-title" eyebrow="বছরের পর বছর" title="বছর ধরে আমাদের কাজ" accent="blue" />

      <div class="mt-10 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="বছর বেছে নিন" @keydown="onKey">
        <button
          v-for="y in years"
          :id="`year-tab-${y}`"
          :key="y"
          type="button"
          role="tab"
          :aria-selected="active === y"
          :aria-controls="`year-panel`"
          :tabindex="active === y ? 0 : -1"
          class="shrink-0 rounded-full border-2 px-5 py-2 text-lg font-semibold transition-colors duration-200"
          :class="active === y ? 'border-blue bg-blue text-white' : 'border-blue/20 bg-white text-navy hover:border-blue'"
          @click="selected = y"
        >
          {{ toBn(y) }}
        </button>
      </div>

      <div id="year-panel" role="tabpanel" :aria-labelledby="`year-tab-${active}`" class="mt-6">
        <p class="text-lg">
          <span class="font-semibold text-blue">{{ toBn(active ?? 0) }}</span> সালে
          <span class="font-semibold">{{ toBn(items.length) }}টি</span> প্রকল্প<span v-if="total > 0">, মোট উপকারভোগী
            <span class="font-semibold text-green-700">{{ formatBn(total) }}</span> জন</span>।
        </p>

        <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink v-for="p in items" :key="p.path" :to="p.path" class="card card-hover flex flex-col gap-2 p-5">
            <span class="self-start rounded-full px-3 py-1 text-sm font-semibold" :class="categories[p.category].badge">{{ p.categoryLabel }}</span>
            <h3 class="text-blue">{{ p.title }}</h3>
            <p class="line-clamp-2 pb-[0.2em] text-navy/80">{{ p.summary }}</p>
          </NuxtLink>
        </div>

        <div class="mt-8 text-center">
          <NuxtLink to="/projects" class="btn btn-outline">সব প্রকল্প দেখুন <AppIcon name="arrow-right" :size="18" /></NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
