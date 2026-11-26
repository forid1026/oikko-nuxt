<script setup lang="ts">
import { isPlaceholder, type BankField } from '~/data/donation'

// দানের তথ্যের card: প্রতিটি সারির পাশে "কপি" button। placeholder থাকলে কপি button দেখায় না।
defineProps<{ title: string; tone: 'pink' | 'orange' | 'blue'; rows: BankField[] }>()

// সম্পূর্ণ class নাম, যাতে Tailwind খুঁজে পায়। সাদা লেখা শুধু গাঢ় রঙে।
const headerTone = { pink: 'bg-pink text-white', orange: 'bg-orange text-navy', blue: 'bg-blue text-white' }
</script>

<template>
  <article class="card overflow-hidden">
    <h3 class="px-6 py-4 text-xl" :class="headerTone[tone]">{{ title }}</h3>
    <span class="stitch !rounded-none" aria-hidden="true" />
    <dl class="divide-y divide-blue/10">
      <div v-for="row in rows" :key="row.label" class="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <div class="min-w-0">
          <dt class="text-sm text-navy/70">{{ row.label }}</dt>
          <dd class="break-words text-lg font-semibold" :class="isPlaceholder(row.value) ? 'text-pink' : ''">{{ row.value }}</dd>
        </div>
        <CopyButton v-if="!isPlaceholder(row.copyValue ?? row.value)" :text="row.copyValue ?? row.value" :label="`${row.label} কপি করুন`" />
      </div>
    </dl>
  </article>
</template>
