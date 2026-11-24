<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)

useHead({ title: is404.value ? 'পেজটি পাওয়া যায়নি | ঐক্য' : 'কিছু একটা ভুল হয়েছে | ঐক্য', meta: [{ name: 'robots', content: 'noindex' }] })

const goHome = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <section class="section">
      <div class="container-page flex flex-col items-center text-center">
        <p class="font-display text-8xl font-bold text-blue md:text-9xl" aria-hidden="true">{{ is404 ? toBn(404) : toBn(error.statusCode || 500) }}</p>
        <h1 class="mt-4 !text-3xl md:!text-4xl">{{ is404 ? 'পেজটি খুঁজে পাওয়া যায়নি' : 'কিছু একটা ভুল হয়েছে' }}</h1>
        <p class="mt-4 max-w-md text-lg text-navy/80">
          {{ is404 ? 'আপনি যে পেজটি খুঁজছেন, সেটি হয়তো সরানো হয়েছে বা লিংকটি ঠিক নেই।' : 'একটু পরে আবার চেষ্টা করুন। সমস্যা থাকলে আমাদের জানান।' }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" class="btn btn-primary" @click="goHome"><AppIcon name="home" :size="18" /> হোমে ফিরে যান</button>
          <NuxtLink to="/projects" class="btn btn-outline" @click="clearError()">আমাদের প্রকল্প দেখুন</NuxtLink>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
