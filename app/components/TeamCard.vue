<script setup lang="ts">
import type { TeamMember } from '~/data/team'

// variant="card": কার্যনির্বাহী কমিটির বড় card; "compact": সদস্যদের ছোট সারি-card।
const props = withDefaults(defineProps<{ member: TeamMember; index?: number; variant?: 'card' | 'compact' }>(), {
  variant: 'card',
})

// ছবি না থাকলে নামের প্রথম অক্ষরের রঙিন avatar। সদস্যভেদে ভিন্ন রঙ (লেখার রঙ contrast-নিরাপদ)।
const tones = ['bg-blue text-white', 'bg-green-700 text-white', 'bg-sky-700 text-white', 'bg-pink text-white', 'bg-orange text-navy']
const tone = computed(() => tones[(props.index ?? 0) % tones.length])
const initial = computed(() => Array.from(props.member.name.trim())[0] ?? '?')
</script>

<template>
  <article
    class="card"
    :class="variant === 'card' ? 'flex w-full flex-col items-center p-6 text-center sm:w-64' : 'flex w-full items-center gap-4 p-4 sm:w-72'"
  >
    <NuxtImg
      v-if="member.photo"
      :src="member.photo"
      :alt="`${member.name}, ${member.role}`"
      :width="variant === 'card' ? 112 : 56"
      :height="variant === 'card' ? 112 : 56"
      loading="lazy"
      class="avatar-stitch skeleton shrink-0 rounded-full object-cover object-top"
      :class="variant === 'card' ? 'h-28 w-28' : 'h-14 w-14'"
    />
    <div
      v-else
      class="avatar-stitch flex shrink-0 items-center justify-center rounded-full font-bold"
      :class="[tone, variant === 'card' ? 'h-28 w-28 text-4xl' : 'h-14 w-14 text-xl']"
      role="img"
      :aria-label="`${member.name}-এর avatar`"
    >
      <span class="pb-[0.1em]">{{ initial }}</span>
    </div>

    <div class="min-w-0" :class="variant === 'card' ? 'mt-4' : ''">
      <h3 :class="variant === 'card' ? '' : '!text-base'">{{ member.name }}</h3>
      <p class="text-navy/75" :class="variant === 'card' ? '' : 'text-sm'">{{ member.role }}</p>
      <a
        v-if="member.facebook"
        :href="member.facebook"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface text-blue hover:bg-blue hover:text-white"
        :aria-label="`${member.name}-এর ফেসবুক প্রোফাইল`"
      >
        <AppIcon name="facebook" :size="18" />
      </a>
    </div>
  </article>
</template>
