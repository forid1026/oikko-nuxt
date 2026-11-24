<script setup lang="ts">
// শুধু ডেভেলপমেন্টে (npm run dev) /dev/font-test ঠিকানায় দেখা যায়।
// nuxt.config.ts-এর 'pages:extend' hook production build-এ এই পেজ যোগই করে না।
useHead({ title: 'ফন্ট পরীক্ষা', meta: [{ name: 'robots', content: 'noindex' }] })

const words = [
  'শিক্ষার্থীদের', 'স্বাবলম্বী', 'দুর্যোগ', 'উদ্বাস্তু', 'ক্ষুধার্ত', 'সংগঠন', 'প্রতিশ্রুতি', 'ঊর্ধ্বে', 'সম্মানিত',
  'ঐক্য', 'মানবতার', 'বৃক্ষরোপণ', 'উপকারভোগী', 'অনুদান', 'সহযাত্রী', 'ধন্যবাদ', 'শ্রদ্ধেয়', 'বিদ্যালয়', 'কর্মসূচি', 'নিঃস্বার্থ',
]
const sentence = 'শিক্ষার্থীদের স্বাবলম্বী করতে এবং দুর্যোগে ক্ষুধার্ত মানুষের পাশে দাঁড়াতে আমরা প্রতিশ্রুতিবদ্ধ। ঊর্ধ্বে উঠুক মানবতা।'
const sizes = [
  { label: 'H1', cls: 'text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.35]' },
  { label: 'H2', cls: 'text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-[1.35]' },
  { label: 'H3', cls: 'text-xl font-semibold leading-[1.35]' },
  { label: 'বডি (১৭px)', cls: 'text-[1.0625rem] leading-[1.75]' },
  { label: 'ছোট (১৪px)', cls: 'text-sm leading-[1.75]' },
]
const weights = [
  { label: '৪০০ সাধারণ', cls: 'font-normal' },
  { label: '৫০০ মাঝারি', cls: 'font-medium' },
  { label: '৬০০ জোরালো', cls: 'font-semibold' },
  { label: '৭০০ বোল্ড', cls: 'font-bold' },
]
</script>

<template>
  <div class="container-page py-10">
    <p class="rounded-2xl bg-orange p-4 font-semibold text-navy">
      শুধু ডেভেলপমেন্টের পেজ। production build-এ এই ঠিকানা থাকে না। যুক্তাক্ষর, মাত্রা, কার ও রেফ কোথাও কাটা বা চাপা পড়ছে কিনা দেখুন।
    </p>

    <h1 class="mt-8">ফন্ট পরীক্ষা: Hind Siliguri</h1>

    <section v-for="w in weights" :key="w.label" class="mt-10">
      <h2 class="!text-lg text-sky-700">{{ w.label }}</h2>
      <div v-for="s in sizes" :key="s.label" class="mt-4 border-b border-blue/10 pb-4">
        <p class="text-xs text-navy/60">{{ s.label }}</p>
        <p :class="[w.cls, s.cls]">{{ words.join('  ') }}</p>
        <p :class="[w.cls, s.cls]">{{ sentence }}</p>
      </div>
    </section>

    <section class="mt-12">
      <h2 class="!text-lg text-sky-700">সংখ্যা ও চিহ্ন</h2>
      <p class="mt-2 text-3xl font-bold">০১২৩৪৫৬৭৮৯ · ৩০০০+ · ১২,৫০০ · ২০১৫ · ০১৭৩৮-৭৩৩৭৪৫ · ৳ · ৫০%</p>
      <p class="mt-2 text-lg">“উক্তি চিহ্ন”, (বন্ধনী), [তৃতীয় বন্ধনী], ‘একক’, — ড্যাশ, ।</p>
    </section>

    <section class="mt-12">
      <h2 class="!text-lg text-sky-700">বাটন ও ট্যাগ</h2>
      <div class="mt-3 flex flex-wrap gap-3">
        <span class="btn btn-donate">দান করুন</span>
        <span class="btn btn-primary">আমাদের কাজ দেখুন</span>
        <span class="btn btn-outline">স্বাবলম্বী প্রকল্প</span>
        <span class="rounded-full bg-pink px-4 py-1 text-sm font-semibold text-white">দুর্যোগ</span>
      </div>
    </section>

    <section class="mt-12">
      <h2 class="!text-lg text-sky-700">লাইন ছাঁটা (line-clamp-2), নিচের মাত্রা কাটছে কিনা</h2>
      <p class="mt-2 line-clamp-2 max-w-md pb-[0.2em] text-lg">{{ sentence }} {{ sentence }} {{ sentence }}</p>
    </section>
  </div>
</template>
