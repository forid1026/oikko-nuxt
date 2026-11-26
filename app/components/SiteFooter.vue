<script setup lang="ts">
import { site, navItems } from '~/data/site'

</script>

<template>
  <footer class="bg-blue-900 text-white">
    <!-- পাঁচ রঙের সেলাই-রেখা -->
    <span class="stitch !h-1.5 !rounded-none" aria-hidden="true" />

    <div class="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
      <div class="lg:col-span-2">
        <!-- লোগোর রঙ গাঢ় নীল, তাই গাঢ় footer-এ সাদা জমিনে বসানো -->
        <NuxtLink to="/" class="inline-block rounded-2xl bg-white p-3" aria-label="ঐক্য — হোম পেজ">
          <img :src="site.logo" alt="ঐক্য সংগঠনের লোগো" width="1178" height="1275" loading="lazy" class="h-24 w-auto" />
        </NuxtLink>
        <p class="mt-5 max-w-md text-white/85">
          {{ site.tagline }}। আমরা একটি অলাভজনক স্বেচ্ছাসেবী সংগঠন। শিক্ষা, পুষ্টি ও আশ্রয়ের মাধ্যমে
          মানুষকে নিজের পায়ে দাঁড়াতে সাহায্য করাই আমাদের কাজ।
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a :href="site.facebookPage" target="_blank" rel="noopener noreferrer" class="btn border-2 border-white/40 !py-2 text-white hover:bg-white hover:text-blue-900">
            <AppIcon name="facebook" :size="18" /> ফেসবুক পেজ
          </a>
          <a :href="site.facebookGroup" target="_blank" rel="noopener noreferrer" class="btn border-2 border-white/40 !py-2 text-white hover:bg-white hover:text-blue-900">
            <AppIcon name="users" :size="18" /> ফেসবুক গ্রুপ
          </a>
        </div>
      </div>

      <nav aria-label="ফুটার মেনু">
        <h2 class="!text-lg !font-semibold !text-white">দ্রুত লিংক</h2>
        <ul class="mt-4 space-y-2">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink :to="item.to" class="text-white/85 underline-offset-4 hover:text-white hover:underline">
              {{ item.label }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/donate" class="text-white/85 underline-offset-4 hover:text-white hover:underline">দান করুন</NuxtLink>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="!text-lg !font-semibold !text-white">যোগাযোগ</h2>
        <ul class="mt-4 space-y-3 text-white/85">
          <li class="flex gap-3"><AppIcon name="pin" class="mt-1 shrink-0" /> <span>{{ site.address }}</span></li>
          <li class="flex gap-3">
            <AppIcon name="phone" class="mt-1 shrink-0" />
            <a :href="`tel:${site.phoneHref}`" class="hover:text-white hover:underline">{{ site.phoneDisplay }}</a>
          </li>
          <li class="flex gap-3">
            <AppIcon name="mail" class="mt-1 shrink-0" />
            <a :href="`mailto:${site.email}`" class="[overflow-wrap:anywhere] hover:text-white hover:underline">{{ site.email }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/15">
      <div class="container-page flex flex-col gap-2 py-5 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
        <p>© ঐক্য (Oikko)। সর্বস্বত্ব সংরক্ষিত।<template v-if="site.registration"> · {{ site.registration }}</template></p>
        <p>{{ site.domain }} · ২০১৫ থেকে মানবতার পাশে</p>
      </div>
    </div>
  </footer>
</template>
