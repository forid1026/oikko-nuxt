<script setup lang="ts">
import type { LightboxItem } from '~/types/project'
import { categories } from '~/data/categories'

// পূর্ণ-পর্দা ছবি দেখা: ← → দিয়ে আগে/পরে, Esc দিয়ে বন্ধ, focus ভেতরেই আটকে থাকে (focus trap)।
const props = defineProps<{ items: LightboxItem[]; index: number | null }>()
const emit = defineEmits<{ close: []; next: []; prev: [] }>()

const current = computed(() => (props.index === null ? null : (props.items[props.index] ?? null)))
const root = ref<HTMLElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
let lastFocused: HTMLElement | null = null

function onKeydown(e: KeyboardEvent) {
  if (props.index === null) return
  if (e.key === 'Escape') return emit('close')
  if (e.key === 'ArrowRight') return emit('next')
  if (e.key === 'ArrowLeft') return emit('prev')
  if (e.key === 'Tab' && root.value) {
    const focusable = root.value.querySelectorAll<HTMLElement>('button:not([disabled])')
    if (!focusable.length) return
    const first = focusable[0]!
    const last = focusable[focusable.length - 1]!
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(
  () => props.index !== null,
  async (open) => {
    if (open) {
      lastFocused = document.activeElement as HTMLElement | null
      document.documentElement.style.overflow = 'hidden'
      document.addEventListener('keydown', onKeydown)
      await nextTick()
      closeBtn.value?.focus()
    } else {
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKeydown)
      lastFocused?.focus()
    }
  },
)

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="current"
      ref="root"
      role="dialog"
      aria-modal="true"
      aria-label="ছবি দেখুন"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy/95 p-4"
      @click.self="emit('close')"
    >
      <button ref="closeBtn" type="button" class="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30" aria-label="বন্ধ করুন" @click="emit('close')">
        <AppIcon name="close" :size="26" />
      </button>
      <button v-if="items.length > 1" type="button" class="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30" aria-label="আগের ছবি" @click="emit('prev')">
        <AppIcon name="arrow-left" :size="26" />
      </button>
      <button v-if="items.length > 1" type="button" class="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30" aria-label="পরের ছবি" @click="emit('next')">
        <AppIcon name="arrow-right" :size="26" />
      </button>

      <figure class="flex max-h-full max-w-5xl flex-col items-center">
        <NuxtImg v-if="current.src" :src="current.src" :alt="current.alt" sizes="100vw" class="max-h-[75vh] w-auto rounded-2xl object-contain" />
        <div
          v-else
          class="flex items-center justify-center rounded-2xl"
          :class="categories[current.category ?? 'education'].badge"
          :style="{ width: 'min(88vw, 52rem)', aspectRatio: `${current.width ?? 3} / ${current.height ?? 2}`, maxHeight: '70vh' }"
          role="img"
          :aria-label="current.alt"
        >
          <AppIcon :name="categories[current.category ?? 'education'].icon" :size="72" class="opacity-80" />
        </div>
        <figcaption v-if="current.caption" class="mt-4 text-center text-white/90">{{ current.caption }}</figcaption>
        <p class="mt-2 text-sm text-white/70" aria-live="polite">{{ toBn((index ?? 0) + 1) }} / {{ toBn(items.length) }}</p>
      </figure>
    </div>
  </Teleport>
</template>
