<script setup lang="ts">
import { milestones, type MilestoneColor } from '~/data/milestones'

// সর্বোচ্চ ১০টি স্লাইডারে; বেশি থাকলে "সব মাইলফলক" বাটনে modal। ডেস্কটপে অনুভূমিক scroll-snap, মোবাইলে swipe।
const MAX = 10
const shown = computed(() => milestones.slice(0, MAX))
const hasMore = milestones.length > MAX

// সম্পূর্ণ class নাম: Tailwind খুঁজে পাবে। বছরের লেখা সাদা জমিনে contrast-নিরাপদ রঙে।
const bar: Record<MilestoneColor, string> = { blue: 'bg-blue', green: 'bg-green', sky: 'bg-sky', orange: 'bg-orange', pink: 'bg-pink' }
const yearText: Record<MilestoneColor, string> = { blue: 'text-blue', green: 'text-green-700', sky: 'text-sky-700', orange: 'text-navy', pink: 'text-pink' }

const track = ref<HTMLElement | null>(null)
function scrollBy(dir: 1 | -1) {
  const el = track.value
  if (!el) return
  el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 340), behavior: 'smooth' })
}

const dialog = ref<HTMLDialogElement | null>(null)
</script>

<template>
  <div>
    <div class="relative">
      <div
        ref="track"
        class="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-6 pt-2 sm:px-6 lg:px-0"
        role="list"
        aria-label="আমাদের মাইলফলক"
        tabindex="0"
      >
        <article v-for="(m, i) in shown" :key="i" role="listitem" class="card w-72 shrink-0 snap-start overflow-hidden sm:w-80">
          <div class="h-1.5" :class="bar[m.color]" />
          <div class="p-6">
            <p class="text-4xl font-bold" :class="yearText[m.color]">{{ m.year }}</p>
            <h3 class="mt-2">{{ m.title }}</h3>
            <p class="mt-2 text-navy/80">{{ m.text }}</p>
          </div>
        </article>
      </div>

      <div class="mt-2 flex items-center justify-center gap-3">
        <button type="button" class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-blue/30 text-blue hover:bg-blue hover:text-white" aria-label="আগের মাইলফলক" @click="scrollBy(-1)">
          <AppIcon name="arrow-left" />
        </button>
        <button type="button" class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-blue/30 text-blue hover:bg-blue hover:text-white" aria-label="পরের মাইলফলক" @click="scrollBy(1)">
          <AppIcon name="arrow-right" />
        </button>
        <button v-if="hasMore" type="button" class="btn btn-outline !py-2" @click="dialog?.showModal()">সব মাইলফলক</button>
      </div>
    </div>

    <!-- সব মাইলফলক (native <dialog>: Esc ও focus trap ব্রাউজারই সামলায়) -->
    <dialog v-if="hasMore" ref="dialog" class="m-auto max-h-[85vh] w-[min(40rem,92vw)] rounded-3xl p-0 backdrop:bg-navy/70" aria-label="সব মাইলফলক">
      <div class="flex items-center justify-between border-b border-blue/10 p-5">
        <h2 class="!text-2xl">সব মাইলফলক</h2>
        <button type="button" class="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface" aria-label="বন্ধ করুন" @click="dialog?.close()">
          <AppIcon name="close" />
        </button>
      </div>
      <ol class="space-y-4 overflow-y-auto p-5">
        <li v-for="(m, i) in milestones" :key="i" class="flex gap-4">
          <span class="mt-2 h-3 w-3 shrink-0 rounded-full" :class="bar[m.color]" aria-hidden="true" />
          <div>
            <p class="text-lg font-bold" :class="yearText[m.color]">{{ m.year }}</p>
            <p class="font-semibold">{{ m.title }}</p>
            <p class="text-navy/80">{{ m.text }}</p>
          </div>
        </li>
      </ol>
    </dialog>
  </div>
</template>
