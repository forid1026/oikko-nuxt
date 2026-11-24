/**
 * Scroll-reveal: IntersectionObserver দিয়ে স্ক্রল করলে উপাদান ধীরে দেখা দেয়।
 *
 * SSR/JS-ছাড়া অবস্থায় উপাদান সবসময় দৃশ্যমান থাকে; `armed` শুধু ব্রাউজারে mount-এর পরে true হয়।
 * যেসব উপাদান প্রথম থেকেই স্ক্রিনে আছে, সেগুলোতে অ্যানিমেশন লাগে না (যাতে ঝলক না দেয়)।
 */
export function useReveal() {
  const el = ref<HTMLElement | null>(null)
  const armed = ref(false)
  const shown = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const target = el.value
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return
    if (target.getBoundingClientRect().top < window.innerHeight * 0.95) return

    armed.value = true
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          shown.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(target)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { el, armed, shown }
}
