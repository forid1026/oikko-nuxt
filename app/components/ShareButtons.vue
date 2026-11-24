<script setup lang="ts">
import { site } from '~/data/site'

// path না দিলে বর্তমান পেজের লিংক শেয়ার হবে। সম্পূর্ণ URL বানাতে site.url ব্যবহার করা হয়
// (static build-এ সার্ভারের host অজানা, তাই request URL নয়)।
const props = defineProps<{ title: string; path?: string }>()
const route = useRoute()
const url = computed(() => `${site.url}${props.path ?? route.path}`)
const fb = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url.value)}`)
const wa = computed(() => `https://wa.me/?text=${encodeURIComponent(`${props.title} ${url.value}`)}`)
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <a :href="fb" target="_blank" rel="noopener noreferrer" class="btn bg-blue !px-4 !py-2 text-sm text-white hover:bg-blue-900">
      <AppIcon name="facebook" :size="16" /> ফেসবুক
    </a>
    <a :href="wa" target="_blank" rel="noopener noreferrer" class="btn bg-green-700 !px-4 !py-2 text-sm text-white hover:bg-blue-900">
      <AppIcon name="message" :size="16" /> হোয়াটসঅ্যাপ
    </a>
    <CopyButton :text="url" label="লিংক কপি" />
  </div>
</template>
