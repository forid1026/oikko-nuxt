<script setup lang="ts">
import type { IconName } from './AppIcon.vue'

// "আমরা যা নিয়ে কাজ করি": মিশনের চারটি স্তম্ভ। ডেস্কটপে ৪টি কার্ড এক সারিতে, ট্যাবলেটে ২×২, মোবাইলে একটির নিচে একটি।
// লেখা আমাদের মিশন ও কাজের তালিকা থেকে; কোনো সংখ্যা বা নির্দিষ্ট ঘটনা বানানো হয়নি।
interface Pillar {
  title: string
  text: string
  to: string
  link: string
  icon: IconName
  /** কাঁথার টুকরোর জমিন + লেখার রঙ (contrast-নিরাপদ জোড়া) */
  tile: string
  /** আইকনের গোল */
  badge: string
}

const pillars: Pillar[] = [
  {
    title: 'শিক্ষা',
    text: 'বৃত্তি ও শিক্ষাসামগ্রী দিয়ে চেষ্টা করি, যেন অভাবে কোনো শিক্ষার্থীর পড়া থেমে না যায়।',
    to: '/projects?category=education',
    link: 'শিক্ষার কাজ',
    icon: 'book',
    tile: 'bg-blue text-white',
    badge: 'bg-white text-blue',
  },
  {
    title: 'পুষ্টি',
    text: 'ঈদে ও প্রয়োজনের সময় অসহায় পরিবারের ঘরে ঘরে খাবার পৌঁছে দিই।',
    to: '/projects?category=food',
    link: 'খাদ্যের কাজ',
    icon: 'food',
    tile: 'bg-orange text-navy',
    badge: 'bg-navy text-white',
  },
  {
    title: 'আশ্রয়',
    text: 'গৃহহীন ও এতিম শিশুদের নিরাপদ আশ্রয় পাওয়া আমাদের মিশনের অন্যতম লক্ষ্য।',
    to: '/about',
    link: 'আমাদের মিশন',
    icon: 'home',
    tile: 'bg-sky text-navy',
    badge: 'bg-navy text-white',
  },
  {
    title: 'স্বাবলম্বন',
    text: 'সাহায্যের পর নিজের পায়ে দাঁড়ানো, যেন কারও কাছে আর হাত পাততে না হয়।',
    to: '/projects?category=selfreliance',
    link: 'স্বাবলম্বী প্রকল্প',
    icon: 'leaf',
    tile: 'bg-green-700 text-white',
    badge: 'bg-white text-green-700',
  },
]
</script>

<template>
  <!-- hero slider-এর নিচের অংশে সামান্য উঠে এসে বসে: চারটি রঙিন কাঁথা-টুকরো -->
  <section class="relative z-30 -mt-12 pb-16 md:-mt-16 md:pb-24" aria-labelledby="pillars-title">
    <h2 id="pillars-title" class="sr-only">আমরা যা নিয়ে কাজ করি</h2>
    <div class="container-page">
      <ul class="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        <li v-for="(p, i) in pillars" :key="p.title">
          <Reveal :delay="i * 90" class="h-full">
            <NuxtLink
              :to="p.to"
              class="tile group flex h-full min-h-[17rem] flex-col p-7 shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
              :class="p.tile"
            >
              <span class="stitch-frame" aria-hidden="true" :style="p.tile.includes('text-navy') ? 'border-color: rgba(11,42,64,.35)' : ''" />
              <span class="relative flex h-14 w-14 items-center justify-center rounded-full transition duration-300 group-hover:rotate-[-8deg]" :class="p.badge">
                <AppIcon :name="p.icon" :size="28" />
              </span>
              <h3 class="relative mt-6 !text-3xl font-bold" style="color: inherit">{{ p.title }}</h3>
              <p class="relative mt-2 flex-1 text-[1.02rem] leading-relaxed opacity-95">{{ p.text }}</p>
              <span class="relative mt-5 inline-flex items-center gap-1.5 font-semibold">
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
