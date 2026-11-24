<script setup lang="ts">
import type { IconName } from './AppIcon.vue'

// "আমরা যা নিয়ে কাজ করি": মিশনের চারটি স্তম্ভ। ডেস্কটপে ৪টি কার্ড এক সারিতে, ট্যাবলেটে ২×২, মোবাইলে একটির নিচে একটি।
// লেখা আমাদের মিশন ও কাজের তালিকা থেকে; কোনো সংখ্যা বা নির্দিষ্ট ঘটনা বানানো হয়নি।
interface Pillar {
  no: string
  title: string
  text: string
  to: string
  link: string
  icon: IconName
  /** আইকনের গোল জমিন: রঙ + ঠিক জোড়ার লেখার রঙ */
  badge: string
  /** কার্ডের উপরের রঙিন দাগ */
  bar: string
}

const pillars: Pillar[] = [
  {
    no: toBn('01'),
    title: 'শিক্ষা',
    text: 'বৃত্তি ও শিক্ষাসামগ্রী দিয়ে চেষ্টা করি, যেন অভাবে কোনো শিক্ষার্থীর পড়া থেমে না যায়।',
    to: '/projects?category=education',
    link: 'শিক্ষার কাজ',
    icon: 'book',
    badge: 'bg-blue text-white',
    bar: 'bg-blue',
  },
  {
    no: toBn('02'),
    title: 'পুষ্টি',
    text: 'ঈদে ও প্রয়োজনের সময় অসহায় পরিবারের ঘরে ঘরে খাবার পৌঁছে দিই।',
    to: '/projects?category=food',
    link: 'খাদ্যের কাজ',
    icon: 'food',
    badge: 'bg-orange text-navy',
    bar: 'bg-orange',
  },
  {
    no: toBn('03'),
    title: 'আশ্রয়',
    text: 'গৃহহীন ও এতিম শিশুদের নিরাপদ আশ্রয় পাওয়া আমাদের মিশনের অন্যতম লক্ষ্য।',
    to: '/about',
    link: 'আমাদের মিশন',
    icon: 'home',
    badge: 'bg-sky text-navy',
    bar: 'bg-sky',
  },
  {
    no: toBn('04'),
    title: 'স্বাবলম্বন',
    text: 'সাহায্যের পর নিজের পায়ে দাঁড়ানো, যেন কারও কাছে আর হাত পাততে না হয়।',
    to: '/projects?category=selfreliance',
    link: 'স্বাবলম্বী প্রকল্প',
    icon: 'leaf',
    badge: 'bg-green-700 text-white',
    bar: 'bg-green',
  },
]
</script>

<template>
  <!-- hero slider-এর নিচের অংশে সামান্য উঠে এসে বসে -->
  <section class="relative z-30 -mt-10 pb-16 md:-mt-12 md:pb-20" aria-labelledby="pillars-title">
    <h2 id="pillars-title" class="sr-only">আমরা যা নিয়ে কাজ করি</h2>
    <div class="container-page">
      <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(p, i) in pillars" :key="p.title">
          <Reveal :delay="i * 90" class="h-full">
            <NuxtLink
              :to="p.to"
              class="group relative flex h-full flex-col overflow-hidden rounded-card bg-white p-6 pt-7 shadow-card transition duration-300 hover:-translate-y-2 hover:shadow-card-hover"
            >
              <span class="absolute inset-x-0 top-0 h-1.5" :class="p.bar" aria-hidden="true" />
              <!-- বড় ঝাপসা ক্রমিক সংখ্যা -->
              <span class="pointer-events-none absolute -right-1 top-2 select-none text-7xl font-bold leading-none text-navy/5" aria-hidden="true">{{ p.no }}</span>

              <span class="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md transition duration-300 group-hover:-rotate-6 group-hover:scale-110" :class="p.badge">
                <AppIcon :name="p.icon" :size="28" />
              </span>
              <h3 class="mt-5 !text-2xl text-navy">{{ p.title }}</h3>
              <p class="mt-2 flex-1 text-navy/80">{{ p.text }}</p>
              <span class="mt-5 inline-flex items-center gap-1 font-semibold text-blue">
                {{ p.link }}
                <AppIcon name="arrow-right" :size="18" class="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </NuxtLink>
          </Reveal>
        </li>
      </ul>
    </div>
  </section>
</template>
