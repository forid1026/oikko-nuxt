<script setup lang="ts">
import { site } from '~/data/site'
import type { ProjectItem } from '~/types/project'

usePageSeo({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  noSuffix: true,
})

// lazy: পেজ বদলের সময় আগে পেজ খুলে carousel-এর জায়গায় skeleton দেখায় (prerender-এ ডাটা আগেই থাকে)
const { data, status } = await useLazyAsyncData('home-projects', () => queryCollection('projects').order('order', 'ASC').all())
const loading = computed(() => status.value === 'pending' && !data.value)
const all = computed(() => (data.value ?? []) as ProjectItem[])
// featured: true চিহ্নিত প্রকল্পগুলো; কোনোটিই না থাকলে প্রথম ৬টি
const featured = computed(() => {
  const f = all.value.filter((p) => p.featured)
  return f.length ? f : all.value.slice(0, 6)
})

const selfRelianceSlug = '/projects/self-reliance-project'
const selfReliancePoints = [
  'শুধু সহায়তা নয়, নিজের পায়ে দাঁড়ানোর সুযোগ',
  'পরিবারের সক্ষমতা বুঝে উপযুক্ত উদ্যোগ',
  'লক্ষ্য একটাই: কারও কাছে হাত পাততে না হওয়া',
]
</script>

<template>
  <div>
    <HeroSlider />

    <!-- আমরা যা নিয়ে কাজ করি: ৪টি কার্ড এক সারিতে -->
    <PillarCards />

    <!-- প্রভাব -->
    <section class="relative isolate overflow-hidden bg-blue-900 py-16 text-white md:py-24" aria-labelledby="impact-title">
      <span class="stitch-frame" aria-hidden="true" />
      <div class="container-page relative">
        <div class="mx-auto max-w-2xl text-center">
          <h2 id="impact-title" class="balance !text-white">সংখ্যায় ঐক্য</h2>
          <span class="stitch mx-auto mt-5 w-28" aria-hidden="true" />
        </div>
        <div class="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          <Reveal><StatCounter dark :value="site.stats.people" suffix="+" label="মানুষকে সাহায্য" /></Reveal>
          <Reveal :delay="80"><StatCounter dark :value="site.stats.members" suffix="+" label="সক্রিয় স্বেচ্ছাসেবী" /></Reveal>
          <Reveal :delay="160"><StatCounter dark :value="site.foundedYear" plain label="সাল থেকে যাত্রা" /></Reveal>
          <Reveal :delay="240"><StatCounter dark text="সারা দেশে" label="আমাদের কাজের পরিধি" /></Reveal>
        </div>
      </div>
    </section>

    <!-- আমাদের কাজ: featured carousel -->
    <section class="section overflow-hidden" aria-labelledby="work-title">
      <div class="container-page">
        <SectionHeading
          id="work-title"
          eyebrow="আমাদের কাজ"
          title="যেভাবে আমরা পাশে দাঁড়াই"
          subtitle="খাদ্য, শিক্ষা, বস্ত্র, দুর্যোগে সহায়তা, পরিবেশ ও স্বাবলম্বন, ছয়টি ক্ষেত্রে আমাদের নিয়মিত কাজ।"
          accent="blue"
        />
      </div>
      <div class="container-page mt-8 px-0 sm:px-6">
        <div v-if="loading" class="flex gap-6 overflow-hidden px-4 py-6 sm:px-6" aria-busy="true" aria-label="প্রকল্প লোড হচ্ছে">
          <div v-for="n in 3" :key="n" class="w-[83%] shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"><ProjectCardSkeleton /></div>
        </div>
        <FeaturedCarousel v-else :projects="featured" />
      </div>
      <div class="mt-8 text-center">
        <NuxtLink to="/projects" class="btn btn-outline">সব প্রকল্প দেখুন <AppIcon name="arrow-right" :size="18" /></NuxtLink>
      </div>
    </section>

    <!-- স্বাবলম্বী প্রকল্প -->
    <section class="section section-alt" aria-labelledby="self-title">
      <div class="container-page">
        <Reveal>
          <div class="bg-selfreliance grid items-center gap-8 overflow-hidden rounded-3xl p-8 text-white md:grid-cols-2 md:p-14">
            <div>
              <p class="mb-2 font-semibold text-white/90">আমাদের বিশেষত্ব</p>
              <h2 id="self-title" class="!text-white">স্বাবলম্বী প্রকল্প</h2>
              <p class="mt-4 text-lg text-white/95">
                একদিনের সাহায্য কষ্ট কমায়, কিন্তু জীবন বদলায় নিজের আয়ের পথ। আমরা চাই মানুষ যেন নিজের পায়ে দাঁড়াতে পারেন।
              </p>
              <NuxtLink :to="selfRelianceSlug" class="btn mt-7 bg-white text-blue hover:bg-surface">
                বিস্তারিত জানুন <AppIcon name="arrow-right" :size="18" />
              </NuxtLink>
            </div>
            <ul class="space-y-4">
              <li v-for="point in selfReliancePoints" :key="point" class="flex gap-3 rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
                <AppIcon name="check" class="mt-1 shrink-0" />
                <span class="text-lg">{{ point }}</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>

    <!-- প্রতিষ্ঠাতার বার্তা -->
    <FounderBand />

    <!-- কাজের মুহূর্ত -->
    <section class="section section-alt overflow-hidden" aria-labelledby="moments-title">
      <div class="container-page">
        <SectionHeading id="moments-title" eyebrow="গ্যালারি" title="কাজের মুহূর্ত" accent="sky" />
      </div>
      <div class="mt-10"><MomentsMarquee /></div>
      <div class="mt-8 text-center">
        <NuxtLink to="/gallery" class="btn btn-outline">পুরো গ্যালারি দেখুন <AppIcon name="arrow-right" :size="18" /></NuxtLink>
      </div>
    </section>

    <!-- কীভাবে পাশে দাঁড়াবেন -->
    <section class="section" aria-labelledby="help-title">
      <div class="container-page">
        <SectionHeading id="help-title" eyebrow="আপনিও পারেন" title="কীভাবে পাশে দাঁড়াবেন" accent="green" />
        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <Reveal>
            <div class="tile flex h-full flex-col bg-orange p-7 text-navy shadow-card md:-mt-4 md:pb-11 md:pt-11">
              <span class="stitch-frame" style="border-color: rgba(11,42,64,.35)" aria-hidden="true" />
              <span class="relative mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white"><AppIcon name="heart" :size="24" /></span>
              <h3 class="relative">দান করুন</h3>
              <p class="relative mt-2 flex-1">যেকোনো অঙ্কের দান কারও না কারও কাজে লাগে। মোবাইল ব্যাংকিং বা ব্যাংক থেকে সহজেই পাঠানো যায়।</p>
              <NuxtLink to="/donate" class="btn relative mt-5 self-start bg-navy text-white hover:bg-blue-900">দান করুন</NuxtLink>
            </div>
          </Reveal>
          <Reveal :delay="100">
            <div class="card flex h-full flex-col p-7">
              <span class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue text-white"><AppIcon name="users" :size="24" /></span>
              <h3>স্বেচ্ছাসেবী হোন</h3>
              <p class="mt-2 flex-1 text-navy/80">সময় ও শ্রম দিয়ে আমাদের সাথে মাঠে কাজ করুন। যেকোনো বয়স ও পেশার মানুষ যুক্ত হতে পারেন।</p>
              <NuxtLink to="/contact" class="btn btn-outline mt-5 self-start">যোগাযোগ করুন</NuxtLink>
            </div>
          </Reveal>
          <Reveal :delay="200">
            <div class="card flex h-full flex-col p-7">
              <span class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-white"><AppIcon name="message" :size="24" /></span>
              <h3>ছড়িয়ে দিন</h3>
              <p class="mt-2 flex-1 text-navy/80">আমাদের কাজের কথা বন্ধু ও পরিবারকে জানান। আপনার একটি শেয়ার নতুন একজন সহযাত্রী আনতে পারে।</p>
              <ShareButtons class="mt-5" :title="`${site.name} — ${site.tagline}`" path="/" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
