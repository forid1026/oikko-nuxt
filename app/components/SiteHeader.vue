<script setup lang="ts">
import { site, navItems } from '~/data/site'

const route = useRoute()
const open = ref(false)
const scrolled = ref(false)
const toggleBtn = ref<HTMLButtonElement | null>(null)

/** বর্তমান পেজ active: হোম শুধু "/" -এ, বাকিগুলো উপ-পাথেও (যেমন /projects/slug) */
function isActive(to: string) {
  return to === '/' ? route.path === '/' : route.path === to || route.path.startsWith(`${to}/`)
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    toggleBtn.value?.focus()
  }
}
function onResize() {
  if (window.innerWidth >= 1024) open.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  document.documentElement.style.overflow = ''
})

// পেজ বদলালে মেনু বন্ধ; মেনু খোলা থাকলে পেছনের স্ক্রল বন্ধ
watch(() => route.fullPath, () => (open.value = false))
watch(open, (v) => {
  document.documentElement.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-[background-color,box-shadow,backdrop-filter] duration-200"
    :class="
      scrolled || open
        ? 'border-blue/10 bg-white/80 shadow-sm backdrop-blur-md'
        : 'border-transparent bg-white'
    "
  >
    <div class="container-page flex h-16 items-center justify-between gap-4 md:h-20">
      <!-- শুধু লোগো: উচ্চতা বেঁধে দেওয়া, প্রস্থ আপনাআপনি অনুপাত মেনে চলে; header-এর উপর-নিচে ৮px ফাঁক -->
      <NuxtLink to="/" class="flex shrink-0 items-center py-2" aria-label="ঐক্য — হোম পেজ">
        <img :src="site.logo" alt="ঐক্য সংগঠনের লোগো" width="1178" height="1275" class="h-12 w-auto md:h-16" />
      </NuxtLink>

      <!-- ডেস্কটপ মেনু -->
      <nav class="hidden items-center gap-1 lg:flex" aria-label="প্রধান মেনু">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-4 py-2 font-medium transition-colors duration-200"
          :class="isActive(item.to) ? 'bg-surface text-blue' : 'text-navy hover:bg-surface hover:text-blue'"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink to="/donate" class="btn btn-donate ml-3 !py-2">
          <AppIcon name="heart" :size="18" /> দান করুন
        </NuxtLink>
      </nav>

      <!-- মোবাইলে hamburger -->
      <button
        ref="toggleBtn"
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full text-blue transition-colors hover:bg-surface lg:hidden"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        :aria-label="open ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'"
        @click="open = !open"
      >
        <AppIcon :name="open ? 'close' : 'menu'" :size="26" />
      </button>
    </div>

    <!-- মোবাইল মেনু (slide-down) -->
    <Transition name="slide" :duration="200">
      <nav
        v-if="open"
        id="mobile-menu"
        class="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-blue/10 bg-white shadow-lg lg:hidden"
        aria-label="মোবাইল মেনু"
      >
        <ul class="container-page flex flex-col gap-1 py-4">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-medium"
              :class="isActive(item.to) ? 'bg-surface text-blue' : 'text-navy hover:bg-surface'"
              :aria-current="isActive(item.to) ? 'page' : undefined"
            >
              {{ item.label }}
              <AppIcon name="chevron-right" :size="18" />
            </NuxtLink>
          </li>
          <li class="pt-2">
            <NuxtLink to="/donate" class="btn btn-donate w-full">
              <AppIcon name="heart" :size="18" /> দান করুন
            </NuxtLink>
          </li>
        </ul>
        <button
          type="button"
          class="container-page flex w-full items-center justify-center gap-2 pb-4 font-medium text-blue"
          @click="open = false"
        >
          <AppIcon name="close" :size="18" /> মেনু বন্ধ করুন
        </button>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
@media (prefers-reduced-motion: reduce) {
  .slide-enter-active,
  .slide-leave-active {
    transition: none;
  }
}
</style>
