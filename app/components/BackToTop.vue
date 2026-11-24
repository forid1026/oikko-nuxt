<script setup lang="ts">
// নিচে স্ক্রল করলে ডান কোণে "উপরে যান" বাটন আসে। reduced-motion হলে লাফিয়ে উপরে যায়।
const route = useRoute()
const show = ref(false)

// প্রকল্পের বিস্তারিত পেজে মোবাইলে নিচে স্থির "দান করুন" বার আছে, তাই বাটন তার উপরে বসে
const aboveBar = computed(() => route.path.startsWith('/projects/'))

function onScroll() {
  show.value = window.scrollY > 500
}
function toTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  // কীবোর্ড ব্যবহারকারীর focus পেজের শুরুতে ফিরিয়ে দেওয়া
  document.getElementById('main')?.focus({ preventScroll: true })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="fade-up">
    <button
      v-if="show"
      type="button"
      class="fixed right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue text-white shadow-lg transition-colors duration-200 hover:bg-blue-900 md:right-6 lg:bottom-6"
      :class="aboveBar ? 'bottom-24' : 'bottom-5'"
      aria-label="পেজের উপরে যান"
      @click="toTop"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
@media (prefers-reduced-motion: reduce) {
  .fade-up-enter-active,
  .fade-up-leave-active {
    transition: none;
  }
}
</style>
