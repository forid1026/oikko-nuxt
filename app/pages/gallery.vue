<script setup lang="ts">
import { categories, categoryOrder, type ProjectCategory } from '~/data/categories'
import { gallery } from '~/data/gallery'
import type { LightboxItem } from '~/types/project'

usePageSeo({
  title: 'গ্যালারি',
  description: 'ঐক্যের বিভিন্ন কাজের ছবি: খাদ্য বিতরণ, বৃত্তি, বস্ত্র, দুর্যোগে সহায়তা, বৃক্ষরোপণ ও আরও অনেক কিছু।',
})

const active = ref<'all' | ProjectCategory>('all')
const tabs = [{ key: 'all' as const, label: 'সব' }, ...categoryOrder.map((k) => ({ key: k, label: categories[k].label }))]

const items = computed<LightboxItem[]>(() =>
  gallery
    .filter((g) => active.value === 'all' || g.category === active.value)
    .map((g) => ({ src: g.src, alt: g.alt, caption: g.caption, width: g.width, height: g.height, category: g.category })),
)
</script>

<template>
  <div>
    <PageHero
      title="গ্যালারি"
      subtitle="ছবিতে আমাদের পথচলা। যেকোনো ছবিতে ক্লিক করলে বড় করে দেখতে পাবেন।"
      :crumbs="[{ label: 'হোম', to: '/' }, { label: 'গ্যালারি' }]"
    />

    <section class="section">
      <div class="container-page">
        <div class="mb-8 flex flex-wrap gap-2" role="group" aria-label="ক্যাটাগরি অনুযায়ী ছবি">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            class="rounded-full border-2 px-4 py-2 font-medium transition-colors duration-200"
            :class="active === tab.key ? 'border-blue bg-blue text-white' : 'border-blue/20 bg-white text-navy hover:border-blue'"
            :aria-pressed="active === tab.key"
            @click="active = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <GalleryGrid v-if="items.length" :key="active" :items="items" />
        <p v-else class="card p-8 text-center text-navy/75">এই ক্যাটাগরিতে এখনো ছবি নেই।</p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
