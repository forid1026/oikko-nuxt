/**
 * স্ক্রিনে এলে 0 থেকে target পর্যন্ত গুনে যায়।
 * সার্ভারে (ও reduced-motion হলে) সরাসরি চূড়ান্ত সংখ্যা দেখায়, তাই SEO ও hydration নিরাপদ।
 */
export function useCountUp(target: number, duration = 1600) {
  const el = ref<HTMLElement | null>(null)
  const value = ref(target)
  let observer: IntersectionObserver | null = null
  let frame = 0

  onMounted(() => {
    const node = el.value
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return

    value.value = 0
    observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer?.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3) // ease-out
          value.value = Math.round(target * eased)
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    cancelAnimationFrame(frame)
  })

  return { el, value }
}
