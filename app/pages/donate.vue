<script setup lang="ts">
import { site } from '~/data/site'
import { bankTransfer, confirmationSteps, impactTiers, isPlaceholder, mobileBanking, transparencyText, warningText } from '~/data/donation'

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
        <h2 class="mt-16 text-center !text-2xl">কত টাকায় কী হয়</h2>
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal v-for="(t, i) in impactTiers" :key="i" :delay="i * 80">
            <div class="card h-full p-6 text-center">
              <p class="font-display text-3xl font-bold text-blue">{{ t.amount }}</p>
              <h3 class="mt-3 !text-lg">{{ t.title }}</h3>
              <p class="mt-2 text-navy/80">{{ t.description }}</p>
            </div>
          </Reveal>
        </div>
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
          <div class="flex gap-4 rounded-3xl border-2 border-pink bg-white p-6" role="note">
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
