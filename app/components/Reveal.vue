<script setup lang="ts">
// ভেতরের বিষয়বস্তু স্ক্রল করলে ধীরে দেখা দেয়। delay (ms) দিয়ে সারির কার্ডে ক্রম আনা যায়।
const props = withDefaults(defineProps<{ tag?: string; delay?: number }>(), { tag: 'div', delay: 0 })
const { el, armed, shown } = useReveal()
</script>

<template>
  <component
    :is="props.tag"
    ref="el"
    :class="armed ? ['reveal', { 'is-visible': shown }] : undefined"
    :style="armed && props.delay ? { transitionDelay: `${props.delay}ms` } : undefined"
  >
    <slot />
  </component>
</template>
