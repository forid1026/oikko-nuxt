<script setup lang="ts">
// value: সংখ্যা, suffix: "+" ইত্যাদি। plain: true হলে গোনা ছাড়াই দেখায় (যেমন সাল: ২০১৫)।
// text দিলে সংখ্যার বদলে সেই লেখা দেখায় (যেমন "সারা বাংলাদেশে")
const props = defineProps<{ value?: number; label: string; suffix?: string; plain?: boolean; text?: string; dark?: boolean }>()
const { el, value: current } = useCountUp(props.value ?? 0)
// সাল ও অন্য অঙ্কে কমা চাই না; বড় সংখ্যায় কমা দিয়ে দেখাই
const numText = computed(() => (props.plain ? toBn(props.value ?? 0) : formatBn(current.value)))
const shown = computed(() => props.text ?? `${numText.value}${props.suffix ?? ''}`)
// গোনার সময় সংখ্যার প্রস্থ বদলে লাফ না দিতে চূড়ান্ত সংখ্যার প্রস্থ আগেই ধরে রাখি
const finalLength = computed(() => (props.text ?? `${props.plain ? toBn(props.value ?? 0) : formatBn(props.value ?? 0)}${props.suffix ?? ''}`).length)
</script>

<template>
  <div ref="el" class="text-center">
    <p class="inline-block text-center font-display text-4xl font-bold sm:text-5xl md:text-6xl" :class="dark ? 'text-white' : 'text-blue'" :style="{ minWidth: `${finalLength * 0.62}em` }">{{ shown }}</p>
    <p class="mt-1 font-medium" :class="dark ? 'text-white/90' : 'text-navy/80'">{{ label }}</p>
  </div>
</template>
