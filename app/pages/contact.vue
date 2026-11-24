<script setup lang="ts">
import { site } from '~/data/site'

usePageSeo({
  title: 'যোগাযোগ',
  description: 'ঐক্যের সাথে যোগাযোগ করুন: ফোন, ইমেইল, ফেসবুক বা সরাসরি বার্তা পাঠান। আমরা তেঁতুলিয়া, পঞ্চগড়ে।',
})

</script>

<template>
  <div>
    <PageHero
      title="যোগাযোগ"
      subtitle="কোনো প্রশ্ন, পরামর্শ বা সহযোগিতার ইচ্ছা থাকলে নির্দ্বিধায় জানান।"
      :crumbs="[{ label: 'হোম', to: '/' }, { label: 'যোগাযোগ' }]"
    />

    <section class="section">
      <div class="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <h2 class="!text-2xl">আমাদের ঠিকানা</h2>
          <ul class="mt-6 space-y-4">
            <li class="card flex items-start gap-4 p-5">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue text-white"><AppIcon name="pin" /></span>
              <div><p class="text-sm text-navy/70">ঠিকানা</p><p class="font-semibold">{{ site.address }}</p></div>
            </li>
            <li class="card flex items-start gap-4 p-5">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-700 text-white"><AppIcon name="phone" /></span>
              <div><p class="text-sm text-navy/70">ফোন</p><a :href="`tel:${site.phoneHref}`" class="font-semibold hover:text-blue hover:underline">{{ site.phoneDisplay }}</a></div>
            </li>
            <li class="card flex items-start gap-4 p-5">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-700 text-white"><AppIcon name="mail" /></span>
              <div class="min-w-0"><p class="text-sm text-navy/70">ইমেইল</p><a :href="`mailto:${site.email}`" class="[overflow-wrap:anywhere] font-semibold hover:text-blue hover:underline">{{ site.email }}</a></div>
            </li>
          </ul>

          <div class="mt-6 flex flex-wrap gap-3">
            <a :href="site.facebookPage" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><AppIcon name="facebook" :size="18" /> ফেসবুক পেজ</a>
            <a :href="site.facebookGroup" target="_blank" rel="noopener noreferrer" class="btn btn-outline"><AppIcon name="users" :size="18" /> ফেসবুক গ্রুপ</a>
          </div>
        </div>

        <div>
          <h2 class="!text-2xl">বার্তা পাঠান</h2>
          <div class="mt-6"><ContactForm /></div>
        </div>
      </div>
    </section>

    <!-- মানচিত্র -->
    <section class="section section-alt">
      <div class="container-page">
        <SectionHeading title="আমাদের অবস্থান" subtitle="তেঁতুলিয়া, পঞ্চগড়" accent="sky" />
        <!-- অবস্থান: Google Maps embed (API key লাগে না)। স্থান বদলাতে data/site.ts-এর mapsEmbed বদলান। -->
        <!-- মানচিত্র লোড হওয়া পর্যন্ত skeleton দেখায় -->
        <div class="card skeleton mt-10 overflow-hidden">
          <iframe
            :src="site.mapsEmbed"
            title="ঐক্যের অবস্থান, তেঁতুলিয়া, পঞ্চগড়"
            class="block h-80 w-full border-0 md:h-[26rem]"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          />
        </div>
        <div class="mt-6 text-center">
          <a :href="site.mapsLink" target="_blank" rel="noopener noreferrer" class="btn btn-outline">Google Maps-এ খুলুন <AppIcon name="external" :size="16" /></a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-page">
        <div class="card mx-auto max-w-3xl p-8 text-center md:p-10">
          <h2 class="!text-2xl">স্বেচ্ছাসেবী হতে চান?</h2>
          <p class="mt-3 text-lg text-navy/85">
            আপনার সময় ও ইচ্ছাই আমাদের সবচেয়ে বড় সম্পদ। উপরের ফর্মে "স্বেচ্ছাসেবী হতে চাই" লিখে বার্তা পাঠান, অথবা আমাদের ফেসবুক গ্রুপে যুক্ত হোন।
          </p>
          <a :href="site.facebookGroup" target="_blank" rel="noopener noreferrer" class="btn btn-primary mt-6"><AppIcon name="users" :size="18" /> ফেসবুক গ্রুপে যুক্ত হোন</a>
        </div>
      </div>
    </section>
  </div>
</template>
