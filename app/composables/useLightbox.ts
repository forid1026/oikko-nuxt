/** Lightbox-এর অবস্থা: কোন ছবি খোলা (null = বন্ধ), পরের/আগের ছবিতে যাওয়া (ঘুরে আসে)। */
export function useLightbox(count: Ref<number>) {
  const index = ref<number | null>(null)

  const open = (i: number) => (index.value = i)
  const close = () => (index.value = null)
  const next = () => {
    if (index.value !== null && count.value) index.value = (index.value + 1) % count.value
  }
  const prev = () => {
    if (index.value !== null && count.value) index.value = (index.value - 1 + count.value) % count.value
  }

  return { index, open, close, next, prev }
}
