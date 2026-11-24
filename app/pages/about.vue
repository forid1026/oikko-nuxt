<script setup lang="ts">
import { site } from '~/data/site'
import type { ProjectItem } from '~/types/project'

usePageSeo({
  title: 'আমাদের সম্পর্কে',
  description: `ঐক্যের গল্প, মিশন ও মূল্যবোধ। ${site.foundedYear} সাল থেকে আমরা সারা বাংলাদেশে মানুষের পাশে আছি।`,
})

const { data } = await useAsyncData('projects-all', () => queryCollection('projects').order('order', 'ASC').all())
const projects = computed(() => (data.value ?? []) as ProjectItem[])

// TODO: ভিশনের বাক্যটি আমি মিশন থেকে সাজিয়েছি। আপনাদের নিজস্ব ভিশন থাকলে সেটি বসান।
const values = [
  { icon: 'heart' as const, title: 'মানবতা', text: 'প্রতিটি মানুষ সমান মর্যাদার যোগ্য, এই বিশ্বাস থেকেই আমাদের সব কাজ।', tone: 'bg-pink text-white' },
  { icon: 'check' as const, title: 'সততা ও স্বচ্ছতা', text: 'দাতার প্রতিটি টাকার হিসাব আমরা খোলামেলাভাবে জানাতে চাই।', tone: 'bg-blue text-white' },
  { icon: 'users' as const, title: 'সহযাত্রা', text: 'যাদের পাশে দাঁড়াই, তাঁরা আমাদের সহযাত্রী। আমরা করুণা নয়, সম্মান নিয়ে কাজ করি।', tone: 'bg-green-700 text-white' },
  { icon: 'home' as const, title: 'স্বাবলম্বন', text: 'লক্ষ্য শুধু সাহায্য নয়, মানুষকে নিজের পায়ে দাঁড়াতে সহায়তা করা।', tone: 'bg-sky-700 text-white' },
]
</script>

<template>
  <div>
    <PageHero
      title="আমাদের সম্পর্কে"
      subtitle="ঐক্য একটি অলাভজনক স্বেচ্ছাসেবী সংগঠন। ২০১৫ থেকে আমরা মানুষের পাশে আছি।"
      :crumbs="[{ label: 'হোম', to: '/' }, { label: 'আমাদের সম্পর্কে' }]"
    />

    <section class="section">
      <div class="container-page grid items-start gap-10 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="আমাদের গল্প" title="যেভাবে শুরু" align="left" accent="blue" />
          <div class="mt-6 space-y-4 text-lg">
            <p>
              ২০১৫ সালে স্বেচ্ছাসেবী উদ্যোগ হিসেবে ঐক্যের যাত্রা শুরু। তারপর থেকে আমরা সারা বাংলাদেশে
              {{ toBn(site.stats.people) }}+ মানুষের পাশে দাঁড়িয়েছি, আর আজ আমাদের সাথে আছেন {{ toBn(site.stats.members) }}+ সক্রিয় সদস্য।
            </p>
          </div>
        </Reveal>
        <Reveal :delay="100">
          <div class="space-y-6">
            <div class="card border-l-4 border-blue p-7">
              <h2 class="!text-2xl">আমাদের মিশন</h2>
              <p class="mt-3 text-lg">
                সমাজের সুবিধাবঞ্চিত মানুষ, বিশেষ করে অতি দরিদ্র, গৃহহীন ও এতিম শিশুদের মানসম্মত শিক্ষা, পুষ্টি ও আশ্রয়ের মাধ্যমে
                দেশের সম্পদে পরিণত করতে সহায়তা করা।
              </p>
            </div>
            <div class="card border-l-4 border-green p-7">
              <h2 class="!text-2xl">আমাদের ভিশন</h2>
              <p class="mt-3 text-lg">এমন একটি সমাজ, যেখানে কাউকে আর কারও কাছে হাত পাততে হয় না, প্রতিটি মানুষ নিজের পায়ে দাঁড়াতে পারেন।</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <!-- প্রতিষ্ঠাতার কথা -->
    <div class="section-alt">
      <FounderSection />
    </div>

    <section class="section">
      <div class="container-page">
        <SectionHeading eyebrow="যা আমরা মানি" title="আমাদের মূল্যবোধ" accent="green" />
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal v-for="(v, i) in values" :key="v.title" :delay="i * 80">
            <div class="card h-full p-6">
              <span class="mb-4 flex h-12 w-12 items-center justify-center rounded-full" :class="v.tone"><AppIcon :name="v.icon" :size="24" /></span>
              <h3>{{ v.title }}</h3>
              <p class="mt-2 text-navy/80">{{ v.text }}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- যাত্রাপথ: মাইলফলক + বছর ধরে কাজ -->
    <section class="section section-alt" aria-labelledby="milestone-title">
      <div class="container-page">
        <SectionHeading id="milestone-title" eyebrow="যাত্রাপথ" title="আমাদের মাইলফলক" accent="sky" />
      </div>
      <div class="container-page mt-10 px-0 sm:px-6"><MilestoneSlider /></div>
    </section>

    <YearlyWork :projects="projects" />

    <section class="section" :class="'section-alt'">
      <div class="container-page">
        <Reveal>
          <div class="card mx-auto max-w-3xl p-8 text-center md:p-10">
            <span class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue text-white"><AppIcon name="info" :size="24" /></span>
            <h2 class="!text-2xl">স্বচ্ছতা ও জবাবদিহিতা</h2>
            <p class="mt-3 text-lg text-navy/85">
              আপনার দান কোথায় কীভাবে ব্যবহার হলো, তা জানার অধিকার আপনার আছে। আমরা নিয়মিত কাজের খবর ও দানের হিসাব ফেসবুক পেজে জানাতে চাই।
            </p>
            <!-- TODO: হিসাব প্রকাশের আসল পদ্ধতি (মাসিক/বার্ষিক, কোথায়) ঠিক হলে এখানে লিখুন -->
            <a :href="site.facebookPage" target="_blank" rel="noopener noreferrer" class="btn btn-outline mt-6"><AppIcon name="facebook" :size="18" /> ফেসবুক পেজে দেখুন</a>
          </div>
        </Reveal>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
