<script setup lang="ts">
import { founder } from '~/data/founder'
</script>

<template>
  <section class="relative isolate overflow-hidden bg-blue text-white" aria-label="প্রতিষ্ঠাতার বার্তা">
    <!-- সাজসজ্জা: নরম আলো, জ্যামিতিক আকার ও বিশাল উদ্ধৃতি-চিহ্ন -->
    <div class="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-sky/35 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -bottom-32 -right-16 -z-10 h-96 w-96 rounded-full bg-green/30 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute right-[6%] top-6 -z-10 select-none text-[16rem] font-bold leading-none text-white/10 md:text-[22rem]" aria-hidden="true">”</div>

    <div class="container-page grid items-center gap-12 py-16 md:grid-cols-[auto_1fr] md:gap-16 md:py-24">
      <Reveal class="relative mx-auto">
        <div class="absolute -inset-3 -rotate-6 rounded-[2.2rem] bg-green/50" aria-hidden="true" />
        <div class="absolute -inset-3 translate-x-4 translate-y-4 rounded-[2.2rem] border-2 border-white/40" aria-hidden="true" />
        <NuxtImg
          :src="founder.photo"
          :alt="founder.photoAlt"
          width="320"
          height="320"
          sizes="sm:70vw md:320px"
          loading="lazy"
          class="skeleton relative h-64 w-64 rounded-[2rem] object-cover shadow-2xl md:h-80 md:w-80"
          style="object-position: center top"
        />
        <!-- glass নাম-ট্যাগ -->
        <div class="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-2xl border border-white/50 bg-white/20 px-5 py-2 text-center shadow-lg backdrop-blur-md">
          <p class="font-semibold">{{ founder.name }}</p>
          <p class="text-sm text-white/90">{{ founder.role }}</p>
        </div>
      </Reveal>

      <Reveal :delay="100" class="text-center md:text-left">
        <p class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1 text-sm font-semibold backdrop-blur-sm">
          <AppIcon name="heart" :size="16" /> প্রতিষ্ঠাতার বার্তা
        </p>
        <blockquote class="mt-6 text-2xl font-medium leading-[1.6] md:text-4xl md:leading-[1.55]">“{{ founder.shortQuote }}”</blockquote>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <NuxtLink to="/about#founder" class="btn bg-white text-blue hover:bg-surface">
            প্রতিষ্ঠাতার কথা পড়ুন <AppIcon name="arrow-right" :size="18" />
          </NuxtLink>
          <NuxtLink to="/team" class="btn border-2 border-white/60 text-white hover:bg-white hover:text-blue">আমাদের টিম</NuxtLink>
        </div>
      </Reveal>
    </div>
  </section>
</template>
