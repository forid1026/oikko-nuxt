/** ক্লিপবোর্ডে কপি করে; সফল হলে `copied` কিছুক্ষণ true থাকে। */
export function useCopy(resetAfterMs = 2000) {
  const copied = ref(false)
  const failed = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  async function copy(text: string): Promise<boolean> {
    failed.value = false
    let ok = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        ok = true
      }
    } catch {
      // নিচের fallback চেষ্টা হবে
    }

    if (!ok) {
      // পুরোনো ব্রাউজার বা non-HTTPS-এর জন্য fallback
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      try {
        ok = document.execCommand('copy')
      } catch {
        ok = false
      }
      document.body.removeChild(ta)
    }

    copied.value = ok
    failed.value = !ok
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
      failed.value = false
    }, resetAfterMs)
    return ok
  }

  onBeforeUnmount(() => clearTimeout(timer))

  return { copy, copied, failed }
}
