<script setup lang="ts">
export interface Crumb {
  label: string
  to?: string // শেষ ধাপে (বর্তমান পেজ) to থাকে না
}
defineProps<{ items: Crumb[]; dark?: boolean }>()
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol class="flex flex-wrap items-center gap-1.5 text-sm" :class="dark ? 'text-white/85' : 'text-navy/75'">
      <li v-for="(item, i) in items" :key="i" class="flex items-center gap-1.5">
        <NuxtLink v-if="item.to" :to="item.to" class="underline-offset-4 hover:underline" :class="dark ? 'hover:text-white' : 'hover:text-blue'">
          {{ item.label }}
        </NuxtLink>
        <span v-else :class="dark ? 'font-semibold text-white' : 'font-semibold text-navy'" aria-current="page">{{ item.label }}</span>
        <AppIcon v-if="i < items.length - 1" name="chevron-right" :size="14" />
      </li>
    </ol>
  </nav>
</template>
