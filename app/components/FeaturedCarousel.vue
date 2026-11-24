<script setup lang="ts">
import type { ProjectItem } from '~/types/project'

// কার্ড carousel: ডেস্কটপে ৩টি, ট্যাবলেটে ২টি, মোবাইলে ১.২টি। scroll-snap, mouse drag, কেন্দ্রের কার্ড সামান্য বড়।
const props = defineProps<{ projects: ProjectItem[] }>()

const track = ref<HTMLElement | null>(null)
const progress = ref(0)
const dragging = ref(false)
let moved = 0
let startX = 0
let startScroll = 0
let frame = 0

function update() {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  progress.value = max > 0 ? el.scrollLeft / max : 1

  // ডেস্কটপে কেন্দ্রের কার্ড সামান্য বড়
  const wide = window.matchMedia('(min-width: 1024px)').matches
  const mid = el.getBoundingClientRect().left + el.clientWidth / 2
  for (const child of Array.from(el.children) as HTMLElement[]) {
    if (!wide) {
      child.style.transform = ''
      continue
    }
    const r = child.getBoundingClientRect()
    const d = Math.abs(r.left + r.width / 2 - mid) / r.width
    child.style.transform = `scale(${1 + 0.04 * Math.max(0, 1 - d)})`
  }
}
const schedule = () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(update)
}

function scrollByCard(dir: 1 | -1) {
  const el = track.value
  const card = el?.firstElementChild as HTMLElement | undefined
  if (!el || !card) return
  el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' })
}

// মাউসে drag (টাচে ব্রাউজারের নিজস্ব swipe চলে)
function onPointerDown(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || e.button !== 0 || !track.value) return
  dragging.value = true
  moved = 0
  startX = e.clientX
  startScroll = track.value.scrollLeft
}
function onPointerMove(e: PointerEvent) {
  if (!dragging.value || !track.value) return
  moved = e.clientX - startX
  track.value.scrollLeft = startScroll - moved
}
function endDrag() {
  dragging.value = false
}
// drag শেষে ভুল করে লিংকে ক্লিক হওয়া আটকানো
function onClickCapture(e: MouseEvent) {
  if (Math.abs(moved) > 5) {
    e.preventDefault()
    e.stopPropagation()
    moved = 0
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') scrollByCard(1)
  else if (e.key === 'ArrowLeft') scrollByCard(-1)
}

onMounted(() => {
  update()
  window.addEventListener('resize', schedule)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', schedule)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <div role="region" aria-roledescription="carousel" aria-label="আমাদের কাজ" @keydown="onKeydown">
    <div
      ref="track"
      class="no-scrollbar flex gap-6 overflow-x-auto px-4 py-6 sm:px-6"
      :class="dragging ? 'cursor-grabbing select-none' : 'cursor-grab snap-x snap-mandatory'"
      @scroll.passive="schedule"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="endDrag"
      @pointerleave="endDrag"
      @click.capture="onClickCapture"
    >
      <div
        v-for="(p, i) in props.projects"
        :key="p.path"
        class="w-[83%] shrink-0 snap-center transition-transform duration-200 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${toBn(i + 1)} / ${toBn(props.projects.length)}`"
      >
        <ProjectCard :project="p" accent draggable="false" />
      </div>
    </div>

    <div class="container-page mt-2 flex items-center gap-4">
      <div class="h-1 flex-1 overflow-hidden rounded-full bg-blue/15" aria-hidden="true">
        <div class="h-full origin-left rounded-full bg-blue transition-transform duration-150" :style="{ transform: `scaleX(${Math.max(progress, 0.12)})` }" />
      </div>
      <div class="flex gap-2">
        <button type="button" class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-blue/30 text-blue hover:bg-blue hover:text-white" aria-label="আগের প্রকল্প" @click="scrollByCard(-1)">
          <AppIcon name="arrow-left" />
        </button>
        <button type="button" class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-blue/30 text-blue hover:bg-blue hover:text-white" aria-label="পরের প্রকল্প" @click="scrollByCard(1)">
          <AppIcon name="arrow-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
