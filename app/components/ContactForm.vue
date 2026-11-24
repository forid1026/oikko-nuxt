<script setup lang="ts">
import { site } from '~/data/site'

// Formspree-তে POST করে। endpoint-এ [YOUR_ID] থাকলে কিছু পাঠায় না (README দেখুন)।
const form = reactive({ name: '', contact: '', subject: '', message: '', _gotcha: '' })
const errors = reactive<Record<'name' | 'contact' | 'subject' | 'message', string>>({ name: '', contact: '', subject: '', message: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[+]?[\d০-৯\s-]{10,15}$/

function validate() {
  errors.name = form.name.trim().length < 2 ? 'অনুগ্রহ করে আপনার নাম লিখুন।' : ''
  const c = form.contact.trim()
  errors.contact = !c
    ? 'ইমেইল বা ফোন নম্বর দিন, যেন আপনাকে উত্তর দিতে পারি।'
    : emailRe.test(c) || phoneRe.test(c)
      ? ''
      : 'সঠিক ইমেইল বা ফোন নম্বর লিখুন।'
  errors.subject = form.subject.trim().length < 3 ? 'বিষয় লিখুন।' : ''
  errors.message = form.message.trim().length < 10 ? 'বার্তাটি অন্তত কয়েকটি শব্দে লিখুন।' : ''
  return !Object.values(errors).some(Boolean)
}

async function submit() {
  if (!validate()) return
  // honeypot ভরা থাকলে এটি বট। সফল দেখিয়ে চুপচাপ বাদ দিই।
  if (form._gotcha) {
    status.value = 'success'
    return
  }
  if (site.formspreeEndpoint.includes('[YOUR_ID]')) {
    status.value = 'error'
    errorMessage.value = `ফর্মটি এখনো চালু হয়নি। অনুগ্রহ করে সরাসরি ${site.email} ঠিকানায় ইমেইল করুন।`
    return
  }
  status.value = 'sending'
  try {
    await $fetch(site.formspreeEndpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: { name: form.name, contact: form.contact, subject: form.subject, message: form.message, _gotcha: form._gotcha },
    })
    status.value = 'success'
    Object.assign(form, { name: '', contact: '', subject: '', message: '', _gotcha: '' })
  } catch {
    status.value = 'error'
    errorMessage.value = `বার্তা পাঠানো যায়নি। একটু পরে আবার চেষ্টা করুন, অথবা ${site.email} ঠিকানায় ইমেইল করুন।`
  }
}

const field = 'mt-1 w-full rounded-2xl border border-blue/20 bg-white px-4 py-3 outline-none transition focus:border-blue focus:ring-2 focus:ring-sky'
</script>

<template>
  <div v-if="status === 'success'" class="card p-8 text-center" role="status">
    <span class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-white"><AppIcon name="check" :size="28" /></span>
    <h3>ধন্যবাদ!</h3>
    <p class="mt-2 text-navy/80">আপনার বার্তা পেয়েছি। শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
    <button type="button" class="btn btn-outline mt-6" @click="status = 'idle'">আরেকটি বার্তা পাঠান</button>
  </div>

  <form v-else class="card space-y-5 p-6 md:p-8" novalidate @submit.prevent="submit">
    <div>
      <label for="cf-name" class="font-semibold">আপনার নাম</label>
      <input id="cf-name" v-model="form.name" type="text" autocomplete="name" :class="field" :aria-invalid="!!errors.name" aria-describedby="cf-name-err" />
      <p id="cf-name-err" class="mt-1 text-sm text-pink" role="alert">{{ errors.name }}</p>
    </div>
    <div>
      <label for="cf-contact" class="font-semibold">ইমেইল বা ফোন নম্বর</label>
      <input id="cf-contact" v-model="form.contact" type="text" autocomplete="email" :class="field" :aria-invalid="!!errors.contact" aria-describedby="cf-contact-err" />
      <p id="cf-contact-err" class="mt-1 text-sm text-pink" role="alert">{{ errors.contact }}</p>
    </div>
    <div>
      <label for="cf-subject" class="font-semibold">বিষয়</label>
      <input id="cf-subject" v-model="form.subject" type="text" :class="field" :aria-invalid="!!errors.subject" aria-describedby="cf-subject-err" />
      <p id="cf-subject-err" class="mt-1 text-sm text-pink" role="alert">{{ errors.subject }}</p>
    </div>
    <div>
      <label for="cf-message" class="font-semibold">বার্তা</label>
      <textarea id="cf-message" v-model="form.message" rows="5" :class="field" :aria-invalid="!!errors.message" aria-describedby="cf-message-err" />
      <p id="cf-message-err" class="mt-1 text-sm text-pink" role="alert">{{ errors.message }}</p>
    </div>

    <!-- spam এড়াতে লুকানো honeypot: মানুষ দেখে না, বট ভরে ফেলে -->
    <div class="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
      <label for="cf-gotcha">এই ঘরটি ফাঁকা রাখুন</label>
      <input id="cf-gotcha" v-model="form._gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
    </div>

    <p v-if="status === 'error'" class="rounded-2xl bg-pink/10 p-4 text-pink" role="alert">{{ errorMessage }}</p>

    <button type="submit" class="btn btn-primary w-full sm:w-auto" :disabled="status === 'sending'">
      <AppIcon name="mail" :size="18" /> {{ status === 'sending' ? 'পাঠানো হচ্ছে…' : 'বার্তা পাঠান' }}
    </button>
  </form>
</template>
