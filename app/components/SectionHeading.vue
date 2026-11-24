<script setup lang="ts">
// accent: সেকশনে একটাই accent রঙ। ছোট লেখার রঙ শুধু contrast-নিরাপদ শেড।
const props = withDefaults(
  defineProps<{
    title: string
    eyebrow?: string
    subtitle?: string
    align?: 'left' | 'center'
    accent?: 'blue' | 'green' | 'sky' | 'pink' | 'orange'
    as?: 'h1' | 'h2'
  }>(),
  { align: 'center', accent: 'blue', as: 'h2' },
)

const eyebrowColor = { blue: 'text-blue', green: 'text-green-700', sky: 'text-sky-700', pink: 'text-pink', orange: 'text-blue' }
const barColor = { blue: 'bg-blue', green: 'bg-green', sky: 'bg-sky', pink: 'bg-pink', orange: 'bg-orange' }
</script>

<template>
  <div :class="props.align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <p v-if="eyebrow" class="mb-2 text-sm font-semibold" :class="eyebrowColor[props.accent]">{{ eyebrow }}</p>
    <component :is="props.as">{{ title }}</component>
    <span
      class="mt-4 block h-1 w-14 rounded-full"
      :class="[barColor[props.accent], props.align === 'center' ? 'mx-auto' : '']"
      aria-hidden="true"
    />
    <p v-if="subtitle" class="mt-4 text-lg text-navy/80">{{ subtitle }}</p>
  </div>
</template>
