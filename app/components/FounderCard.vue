<script setup lang="ts">
import type { TeamMember } from '~/data/team'

// প্রতিষ্ঠাতার বড় বিশেষ card (টিম পেজে)। উক্তি থাকলে তবেই দেখায়।
defineProps<{ member: TeamMember }>()
</script>

<template>
  <article class="card mx-auto grid max-w-4xl items-center gap-8 overflow-hidden p-6 md:grid-cols-[18rem_1fr] md:p-8">
    <div class="relative mx-auto w-full max-w-72">
      <div class="absolute -bottom-3 -right-3 h-full w-full rounded-3xl bg-green/30" aria-hidden="true" />
      <NuxtImg
        v-if="member.photo"
        :src="member.photo"
        :alt="`ঐক্যের ${member.role} ${member.name}`"
        width="288"
        height="288"
        sizes="sm:80vw md:288px"
        loading="lazy"
        class="skeleton relative aspect-square w-full rounded-3xl object-cover object-top"
      />
      <div v-else class="relative flex aspect-square w-full items-center justify-center rounded-3xl bg-blue text-7xl font-bold text-white" role="img" :aria-label="member.name">
        {{ Array.from(member.name)[0] }}
      </div>
    </div>
    <div class="text-center md:text-left">
      <span class="inline-block rounded-full bg-blue px-4 py-1 text-sm font-semibold text-white">{{ member.role }}</span>
      <h3 class="mt-3 !text-3xl">{{ member.name }}</h3>
      <p class="text-navy/70">{{ member.nameEn }}</p>
      <blockquote v-if="member.quote" class="mt-5 border-l-4 border-green pl-4 text-lg text-navy/90">“{{ member.quote }}”</blockquote>
      <div class="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
        <NuxtLink to="/about#founder" class="btn btn-outline !py-2">প্রতিষ্ঠাতার কথা পড়ুন</NuxtLink>
        <a v-if="member.facebook" :href="member.facebook" target="_blank" rel="noopener noreferrer" class="btn btn-primary !py-2"><AppIcon name="facebook" :size="18" /> ফেসবুক</a>
      </div>
    </div>
  </article>
</template>
