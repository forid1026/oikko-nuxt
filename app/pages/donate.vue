<script setup lang="ts">
import { site } from '~/data/site'
import { bankTransfer, confirmationSteps, impactTiers, isPlaceholder, mobileBanking, transparencyText, warningText } from '~/data/donation'

// "কত টাকায় কী হয়": আসল অঙ্ক বসানোর আগে শুধু ডেভেলপমেন্টে দেখায়, প্রকাশিত সাইটে [ ] চিহ্নসহ লেখা যেন না যায়।
const tiersReady = !impactTiers.some((t) => isPlaceholder(t.amount) || isPlaceholder(t.title) || isPlaceholder(t.description))
const showTiers = tiersReady || import.meta.dev
const tierTones = ['bg-orange text-navy', 'bg-sky text-navy', 'bg-green-700 text-white', 'bg-blue text-white']

const flow = [
  { icon: 'heart' as const, title: 'আপনি দান করেন', text: 'নিচের যেকোনো মাধ্যমে, ছোট বা বড় যেকোনো অঙ্কে।' },
  { icon: 'users' as const, title: 'আমরা কাজে লাগাই', text: 'স্বেচ্ছাসেবীরা সরাসরি প্রয়োজনের জায়গায় পৌঁছে দেন।' },
  { icon: 'check' as const, title: 'আপনাকে জানাই', text: 'কোন দান কোন কাজে লেগেছে, তা আমরা জানাতে চাই।' },
]

usePageSeo({
  title: 'দান করুন',
  description: 'ঐক্যের কাজে পাশে থাকুন। বিকাশ, নগদ, রকেট বা ব্যাংক ট্রান্সফারে সহজেই দান পাঠান।',
})
</script>

<template>
  <div>
    <PageHero
      title="দান করুন"
      subtitle="আপনার সহায়তা সরাসরি পৌঁছে যায় যাদের প্রয়োজন, তাদের কাছে।"
      :crumbs="[{ label: 'হোম', to: '/' }, { label: 'দান করুন' }]"
    />

    <!-- দানের পথ: তিন ধাপের বিশ্বাস-রেখা -->
    <section class="section !pb-0" aria-label="আপনার দান যেভাবে কাজ করে">
      <div class="container-page">
        <ol class="grid gap-4 md:grid-cols-3">
          <li v-for="(f, i) in flow" :key="f.title">
            <Reveal :delay="i * 90" class="h-full">
              <div class="card relative h-full p-6 pl-20">
                <span class="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-blue text-white"><AppIcon :name="f.icon" :size="22" /></span>
                <h3 class="!text-xl">{{ f.title }}</h3>
                <p class="mt-1 text-navy/80">{{ f.text }}</p>
              </div>
            </Reveal>
          </li>
        </ol>
        <span class="stitch mx-auto mt-10 w-40" aria-hidden="true" />
      </div>
    </section>

    <!-- ভূমিকা -->
    <section class="section">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <h2>আপনার দান কোথায় যায়</h2>
          <p class="mt-4 text-lg text-navy/85">
            দান আমরা ব্যবহার করি খাদ্য, শিক্ষা, বস্ত্র, দুর্যোগে সহায়তা, পরিবেশ ও স্বাবলম্বী প্রকল্পের কাজে।
            আপনি বড় বা ছোট যে অঙ্কই দিন, তা কারও না কারও জীবনে সত্যিই কাজে লাগে।
          </p>
        </div>

        <!-- কত টাকায় কী হয় -->
        <template v-if="showTiers">
          <h2 class="mt-16 text-center !text-2xl">কত টাকায় কী হয়</h2>
          <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal v-for="(t, i) in impactTiers" :key="i" :delay="i * 80" class="h-full">
              <div class="tile h-full p-7 text-center shadow-card" :class="tierTones[i % tierTones.length]">
                <span class="stitch-frame" :style="tierTones[i % tierTones.length].includes('text-navy') ? 'border-color: rgba(11,42,64,.35)' : ''" aria-hidden="true" />
                <p class="relative font-display text-4xl font-bold">{{ t.amount }}</p>
                <h3 class="relative mt-3 !text-lg" style="color: inherit">{{ t.title }}</h3>
                <p class="relative mt-2 opacity-95">{{ t.description }}</p>
              </div>
            </Reveal>
          </div>
        </template>
      </div>
    </section>

    <!-- মোবাইল ব্যাংকিং -->
    <section class="section section-alt">
      <div class="container-page">
        <SectionHeading eyebrow="দানের মাধ্যম" title="মোবাইল ব্যাংকিং" accent="green" />
        <div class="mt-10 grid gap-6 md:grid-cols-3">
          <DonationCard
            v-for="m in mobileBanking"
            :key="m.id"
            :title="m.name"
            :tone="m.tone"
            :rows="[
              { label: 'নম্বর', value: m.number, copyValue: m.copyValue },
              { label: 'অ্যাকাউন্টের ধরন', value: m.accountType },
            ]"
          />
        </div>

        <h2 class="mt-16 text-center !text-2xl">ব্যাংক ট্রান্সফার</h2>
        <div class="mx-auto mt-8 max-w-2xl">
          <DonationCard title="ব্যাংকের তথ্য" tone="blue" :rows="bankTransfer" />
        </div>

        <p
          v-if="mobileBanking.some((m) => isPlaceholder(m.accountType))"
          class="mx-auto mt-6 max-w-2xl rounded-2xl bg-pink/10 p-4 text-center text-pink"
        >
          <!-- TODO: অ্যাকাউন্টের ধরন (Personal/Merchant/Agent) ও রাউটিং নম্বর বসানো হলে এই সতর্কতা আপনাআপনি সরে যাবে (শুধু অ্যাকাউন্টের ধরনের জন্য) -->
          [কিছু তথ্য এখনো বসানো হয়নি, প্রকাশের আগে data/donation.ts ফাইল দেখুন।]
        </p>
      </div>
    </section>

    <!-- নিশ্চিত করার ধাপ -->
    <section class="section">
      <div class="container-page grid items-start gap-10 lg:grid-cols-2">
        <div>
          <h2>দানের পর যা করবেন</h2>
          <ol class="mt-6 space-y-4">
            <li v-for="(s, i) in confirmationSteps" :key="i" class="flex gap-4">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue font-display font-bold text-white">{{ toBn(i + 1) }}</span>
              <span class="pt-1 text-lg">{{ s }}</span>
            </li>
          </ol>
          <div class="mt-6 flex flex-wrap gap-3">
            <a :href="`mailto:${site.email}`" class="btn btn-outline"><AppIcon name="mail" :size="18" /> ইমেইল করুন</a>
            <a :href="site.facebookPage" target="_blank" rel="noopener noreferrer" class="btn btn-outline"><AppIcon name="facebook" :size="18" /> ফেসবুক পেজ</a>
          </div>
        </div>

        <div class="space-y-6">
          <div class="flex gap-4 rounded-3xl border-2 border-dashed border-pink bg-white p-6" role="note">
            <AppIcon name="alert" :size="28" class="mt-1 shrink-0 text-pink" />
            <div>
              <h3 class="text-pink">সতর্কতা</h3>
              <p class="mt-1 text-lg">{{ warningText }}</p>
            </div>
          </div>
          <div class="card p-6">
            <h3>স্বচ্ছতা</h3>
            <p class="mt-2 text-lg text-navy/85">{{ transparencyText }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
