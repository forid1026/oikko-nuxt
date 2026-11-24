<script setup lang="ts">
import { founder } from '~/data/founder'
</script>

<template>
  <section id="founder" class="section overflow-x-clip" aria-labelledby="founder-title">
    <div class="container-page grid items-start gap-12 lg:grid-cols-[22rem_1fr] lg:gap-16">
      <!-- ছবি: পেছনে নরম জ্যামিতিক আকার ও সরু বর্ডার -->
      <Reveal class="relative mx-auto w-full max-w-sm lg:sticky lg:top-28">
        <div class="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-blue/10" aria-hidden="true" />
        <div class="absolute -bottom-6 -right-6 h-44 w-44 rotate-12 rounded-3xl bg-green/20" aria-hidden="true" />
        <div class="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-blue/30" aria-hidden="true" />
        <NuxtImg
          :src="founder.photo"
          :alt="founder.photoAlt"
          width="960"
          height="958"
          sizes="sm:90vw lg:352px"
          loading="lazy"
          class="skeleton relative aspect-[4/5] w-full rounded-3xl object-cover shadow-card"
          style="object-position: center top"
        />
      </Reveal>

      <div>
        <p class="font-semibold text-sky-700">ঐক্যের প্রতিষ্ঠাতা</p>
        <h2 id="founder-title">প্রতিষ্ঠাতার কথা</h2>
        <p class="mt-2 text-lg"><span class="font-semibold text-blue">{{ founder.name }}</span> · {{ founder.role }}</p>

        <figure class="mt-8 rounded-3xl bg-surface p-6 md:p-8">
          <blockquote class="text-2xl leading-relaxed text-navy md:text-3xl">“{{ founder.pullQuote }}”</blockquote>
        </figure>

        <div class="mt-8 space-y-8">
          <Reveal v-for="s in founder.sections" :key="s.title">
            <h3 class="text-blue">{{ s.title }}</h3>
            <p v-for="(p, i) in s.paragraphs" :key="i" class="mt-2 text-lg text-navy/90">{{ p }}</p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
</template>
