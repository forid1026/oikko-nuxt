<script setup lang="ts">
import { categories } from '~/data/categories'
import type { ProjectItem } from '~/types/project'

const props = defineProps<{ project: ProjectItem; accent?: boolean }>()
const meta = computed(() => categories[props.project.category])
</script>

<template>
  <NuxtLink :to="project.path" class="card card-hover group flex h-full flex-col overflow-hidden">
    <!-- ক্যাটাগরির রঙের উপরের বর্ডার (carousel-এ) -->
    <div v-if="accent" class="h-1.5 shrink-0" :class="meta.surface" aria-hidden="true" />
    <div class="relative">
      <CoverImage :src="project.cover" :alt="`${project.title} প্রকল্পের ছবি`" :category="project.category" />
      <span class="absolute left-3 top-3 rounded-full px-3 py-1 text-sm font-semibold" :class="meta.badge">
        {{ project.categoryLabel }}
      </span>
      <span class="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-sm font-semibold text-navy">
        {{ project.statusLabel }}
      </span>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <h3 class="text-blue group-hover:underline group-hover:underline-offset-4">{{ project.title }}</h3>
      <p class="mt-2 line-clamp-3 flex-1 pb-[0.2em] text-navy/80">{{ project.summary }}</p>
      <p class="mt-4 flex items-center gap-2 border-t border-blue/10 pt-3 text-sm font-medium text-navy/80">
        <AppIcon name="users" :size="16" /> উপকারভোগী: {{ project.beneficiaries }}
      </p>
    </div>
  </NuxtLink>
</template>
