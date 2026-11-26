<script setup lang="ts">
import { categories } from '~/data/categories'
import { slides } from '~/data/slides'

// নিজের হালকা slider (কোনো নতুন dependency নেই): cross-fade ও Ken Burns scroll-snap লাইব্রেরির চেয়ে এভাবে সরল ও স্থিতিশীল।
// autoplay-এর সময় চলে CSS progress bar-এর animation দিয়ে (animationend হলে পরের স্লাইড), তাই pause করলে bar ও সময় একসাথে থামে।
const AUTOPLAY_MS = 6000
const count = slides.length

const current = ref(0)
const previous = ref<number | null>(null) // fade-out চলার সময় Ken Burns ধরে রাখতে
const userPlaying = ref(true)
const hovered = ref(false)
const focused = ref(false)
const tabHidden = ref(false)
const reduced = ref(false)

const running = computed(() => userPlaying.value && !hovered.value && !focused.value && !tabHidden.value && !reduced.value)

function go(i: number) {
  const target = (i + count) % count
  if (target === current.value) return
  previous.value = current.value
  current.value = target
}
const next = () => go(current.value + 1)
const prev = () => go(current.value - 1)
const onBarEnd = () => {
  if (!reduced.value) next()
}

const pad = (n: number) => toBn(String(n).padStart(2, '0'))
const upcoming = computed(() => [1, 2].map((d) => (current.value + d) % count).filter((i) => i !== current.value))

// ---- swipe / drag ----
let startX = 0
let startY = 0
let tracking = false
function onPointerDown(e: PointerEvent) {
  if ((e.target as HTMLElement).closest('a,button')) return
  tracking = true
  startX = e.clientX
  startY = e.clientY
}
function onPointerUp(e: PointerEvent) {
  if (!tracking) return
  tracking = false
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}
function onFocusOut(e: FocusEvent) {
  if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node | null)) focused.value = false
}

const onVisibility = () => (tabHidden.value = document.hidden)
onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => document.removeEventListener('visibilitychange', onVisibility))
</script>

<template>
  <section
    class="group relative isolate h-[70vh] min-h-[32rem] touch-pan-y select-none overflow-hidden bg-blue-900 text-white md:h-[80vh] md:min-h-[36rem]"
    role="region"
    aria-roledescription="carousel"
    aria-label="ঐক্যের কাজের স্লাইড"
    @pointerenter="hovered = true"
    @pointerleave="hovered = false"
    @focusin="focused = true"
    @focusout="onFocusOut"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @keydown="onKeydown"
  >
    <h1 class="sr-only">ঐক্য — ২০১৫ থেকে মানবতার পাশে</h1>

    <div aria-atomic="false" :aria-live="running ? 'off' : 'polite'" class="absolute inset-0">
      <div
        v-for="(s, i) in slides"
        :key="s.id"
        class="slide absolute inset-0 transition-opacity duration-1000"
        :class="i === current ? 'slide-active z-10 opacity-100' : 'z-0 opacity-0'"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${toBn(i + 1)} / ${toBn(count)}`"
        :aria-hidden="i !== current"
        :inert="i !== current"
      >
        <!-- ছবি বা placeholder -->
        <div class="absolute inset-0" :class="!reduced && (i === current || i === previous) ? 'kenburns' : ''">
          <NuxtImg
            v-if="s.image"
            :src="s.image"
            :alt="s.imageAlt"
            sizes="sm:100vw"
            :loading="i === 0 ? 'eager' : 'lazy'"
            :fetchpriority="i === 0 ? 'high' : 'auto'"
            class="skeleton h-full w-full object-cover"
          />
          <div v-else class="relative h-full w-full" :class="categories[s.category].surface" aria-hidden="true">
            <div class="absolute inset-0 bg-linear-to-br from-white/25 via-transparent to-black/20" />
            <AppIcon :name="categories[s.category].icon" :size="260" class="absolute right-[8%] top-1/2 hidden -translate-y-1/2 text-white/25 md:block" />
          </div>
        </div>
        <!-- লেখা পড়ার জন্য --blue-900 থেকে স্বচ্ছ overlay (সাদা লেখা, WCAG AA) -->
        <div class="absolute inset-0 bg-linear-to-t from-blue-900/95 via-blue-900/70 to-blue-900/40 md:bg-linear-to-r md:from-blue-900/95 md:via-blue-900/75 md:to-blue-900/25" />

        <span class="stitch-frame !inset-4 md:!inset-6" aria-hidden="true" />
        <div class="container-page relative flex h-full flex-col justify-end pb-36 md:pb-40">
          <div class="max-w-2xl">
            <span class="step inline-block rounded-full px-4 py-1 text-sm font-semibold" :class="categories[s.category].badge" style="--i: 0">
              {{ categories[s.category].label }}
            </span>
            <h2 class="step balance mt-4 !text-white font-bold" style="--i: 1; font-size: clamp(2.1rem, 5.4vw, 4.1rem); line-height: 1.3">{{ s.title }}</h2>
            <p class="step mt-3 text-lg text-white/95 md:text-xl" style="--i: 2">{{ s.text }}</p>
            <div class="step mt-6 flex flex-wrap gap-3" style="--i: 3">
              <NuxtLink :to="s.href" class="btn bg-white text-blue hover:bg-surface">বিস্তারিত দেখুন <AppIcon name="arrow-right" :size="18" /></NuxtLink>
              <NuxtLink to="/donate" class="btn btn-donate"><AppIcon name="heart" :size="18" /> দান করুন</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- আগে/পরে তীর (glass) -->
    <button
      type="button"
      class="absolute left-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white opacity-80 backdrop-blur-md transition hover:bg-white/30 group-hover:opacity-100 md:flex"
      aria-label="আগের স্লাইড"
      @click="prev"
    >
      <AppIcon name="arrow-left" :size="24" />
    </button>
    <button
      type="button"
      class="absolute right-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white opacity-80 backdrop-blur-md transition hover:bg-white/30 group-hover:opacity-100 md:flex"
      aria-label="পরের স্লাইড"
      @click="next"
    >
      <AppIcon name="arrow-right" :size="24" />
    </button>

    <!-- ডেস্কটপে পরের ২টি স্লাইডের ঝলক -->
    <div class="absolute bottom-32 right-8 z-20 hidden gap-3 lg:flex">
      <button
        v-for="i in upcoming"
        :key="i"
        type="button"
        class="flex w-44 items-center gap-3 rounded-2xl border border-white/30 bg-white/15 p-2 text-left backdrop-blur-md transition hover:bg-white/25"
        :aria-label="`${toBn(i + 1)} নম্বর স্লাইডে যান: ${slides[i]!.title}`"
        @click="go(i)"
      >
        <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" :class="categories[slides[i]!.category].badge">
          <AppIcon :name="categories[slides[i]!.category].icon" :size="22" />
        </span>
        <span class="line-clamp-2 pb-[0.2em] text-sm font-medium">{{ slides[i]!.title }}</span>
      </button>
    </div>

    <!-- নিচে: গণনা, progress bar, pause/play -->
    <div class="absolute inset-x-0 bottom-14 z-20 md:bottom-16">
      <div class="container-page flex items-center gap-4">
        <p class="shrink-0 font-semibold" aria-hidden="true">{{ pad(current + 1) }} / {{ pad(count) }}</p>
        <div class="flex flex-1 gap-2">
          <button
            v-for="(s, i) in slides"
            :key="s.id"
            type="button"
            class="group/bar flex h-8 flex-1 items-center"
            :aria-label="`${toBn(i + 1)} নম্বর স্লাইডে যান`"
            :aria-current="i === current ? 'true' : undefined"
            @click="go(i)"
          >
            <span class="relative block h-1 w-full overflow-hidden rounded-full bg-white/35 transition-all group-hover/bar:h-1.5">
              <span v-if="i < current || (i === current && reduced)" class="absolute inset-0 bg-white" />
              <span
                v-else-if="i === current"
                :key="`fill-${current}`"
                class="bar-fill absolute inset-0 bg-white"
                :style="{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: running ? 'running' : 'paused' }"
                @animationend="onBarEnd"
              />
            </span>
          </button>
        </div>
        <button
          type="button"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-md hover:bg-white/30"
          :aria-label="userPlaying ? 'অটোপ্লে থামান' : 'অটোপ্লে চালু করুন'"
          :disabled="reduced"
          @click="userPlaying = !userPlaying"
        >
          <svg v-if="userPlaying && !reduced" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kenburns {
  animation: kenburns 8s ease-out forwards;
}
@keyframes kenburns {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.08);
  }
}

/* লেখা ক্রমান্বয়ে উঠে আসে: badge → শিরোনাম → বর্ণনা → বাটন */
.step {
  opacity: 0;
  transform: translateY(18px);
}
.slide-active .step {
  animation: step-in 700ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
  animation-delay: calc(var(--i) * 140ms + 250ms);
}
@keyframes step-in {
  to {
    opacity: 1;
    transform: none;
  }
}

.bar-fill {
  transform-origin: left;
  animation: bar-fill linear forwards;
}
@keyframes bar-fill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .kenburns {
    animation: none;
  }
  .step,
  .slide-active .step {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
