<script setup lang="ts">
// text কপি করে; কপি হলে "কপি হয়েছে ✓" দেখায়। screen reader-এর জন্য aria-live।
const props = withDefaults(defineProps<{ text: string; label?: string; copiedLabel?: string }>(), {
  label: 'কপি করুন',
  copiedLabel: 'কপি হয়েছে ✓',
})
const { copy, copied, failed } = useCopy()
</script>

<template>
  <button
    type="button"
    class="btn !px-4 !py-2 text-sm"
    :class="copied ? 'bg-green-700 text-white' : 'border-2 border-blue bg-white text-blue hover:bg-blue hover:text-white'"
    @click="copy(props.text)"
  >
    <AppIcon :name="copied ? 'check' : 'copy'" :size="16" />
    <span aria-live="polite">{{ copied ? props.copiedLabel : failed ? 'কপি করা যায়নি' : props.label }}</span>
  </button>
</template>
