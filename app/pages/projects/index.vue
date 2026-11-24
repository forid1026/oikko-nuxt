<script setup lang="ts">
import type { ProjectItem } from '~/types/project'

usePageSeo({
  title: 'আমাদের প্রকল্প',
  description: 'খাদ্য, শিক্ষা, বস্ত্র, দুর্যোগে সহায়তা, পরিবেশ ও স্বাবলম্বন: ঐক্যের সব কাজ এক জায়গায়।',
})

// lazy: পেজ বদলের সময় আগে পেজ খুলে skeleton দেখায়, ডাটা এলে কার্ড বসে (prerender-এ ডাটা আগেই থাকে)
const { data, status } = await useLazyAsyncData('projects-all', () => queryCollection('projects').order('order', 'ASC').all())
const loading = computed(() => status.value === 'pending' && !data.value)
const projects = computed(() => (data.value ?? []) as ProjectItem[])

const { category, query, filtered, counts, setCategory } = useProjectFilter(projects)
</script>

<template>
  <div>
    <PageHero
      title="আমাদের প্রকল্প"
      subtitle="ছোট-বড় প্রতিটি কাজ এসেছে মানুষের পাশে দাঁড়ানোর ইচ্ছা থেকে। এখানে সব প্রকল্প দেখতে পাবেন।"
      :crumbs="[{ label: 'হোম', to: '/' }, { label: 'প্রকল্প' }]"
    />

    <section class="section">
      <div class="container-page">
        <ProjectFilter :category="category" v-model:query="query" :counts="counts" @update:category="setCategory" />

        <div v-if="loading" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="প্রকল্প লোড হচ্ছে">
          <ProjectCardSkeleton v-for="n in 6" :key="n" />
        </div>
        <template v-else>
        <p class="mt-6 text-navy/75" aria-live="polite">{{ toBn(filtered.length) }}টি প্রকল্প পাওয়া গেছে</p>

        <div v-if="filtered.length" class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="p in filtered" :key="p.path" :project="p" />
        </div>
        <div v-else class="card mt-8 p-10 text-center">
          <p class="text-lg font-semibold">কোনো প্রকল্প পাওয়া যায়নি</p>
          <p class="mt-2 text-navy/75">অন্য কোনো শব্দ বা ক্যাটাগরি দিয়ে খুঁজে দেখুন।</p>
          <button type="button" class="btn btn-outline mt-5" @click="(query = ''), setCategory('all')">সব প্রকল্প দেখুন</button>
        </div>
        </template>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
