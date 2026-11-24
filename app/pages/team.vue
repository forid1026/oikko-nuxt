<script setup lang="ts">
import { site } from '~/data/site'
import { executives, founders, members, type TeamGroup, type TeamMember } from '~/data/team'

usePageSeo({
  title: 'আমাদের টিম',
  description: 'ঐক্যের প্রতিষ্ঠাতা, কার্যনির্বাহী কমিটি ও সদস্যবৃন্দ, যাদের হাত ধরে প্রতিটি কাজ এগিয়ে যায়।',
})

// সার্চ ও ফিল্টার সবসময় থাকে। সদস্য বেশি হলে প্রথমে ১২ জন, "আরও দেখুন" বাটনে আরও ১২ জন।
const PAGE = 12
const query = ref('')
const group = ref<'all' | TeamGroup>('all')
const visible = ref(PAGE)

const matches = (m: TeamMember) => {
  const q = query.value.trim().toLowerCase()
  return !q || [m.name, m.nameEn, m.role].some((s) => s.toLowerCase().includes(q))
}
const founderList = computed(() => (group.value === 'all' || group.value === 'founder' ? founders.filter(matches) : []))
const executiveList = computed(() => (group.value === 'all' || group.value === 'executive' ? executives.filter(matches) : []))
const memberList = computed(() => (group.value === 'all' || group.value === 'member' ? members.filter(matches) : []))
const memberShown = computed(() => memberList.value.slice(0, visible.value))
const total = computed(() => founderList.value.length + executiveList.value.length + memberList.value.length)

// ফিল্টার-বাটন: শুধু যে দলে সদস্য আছে সেগুলো
const tabs = computed(() => {
  const all: { key: 'all' | TeamGroup; label: string; count: number }[] = [
    { key: 'all', label: 'সবাই', count: founders.length + executives.length + members.length },
    { key: 'founder', label: 'প্রতিষ্ঠাতা', count: founders.length },
    { key: 'executive', label: 'কার্যনির্বাহী কমিটি', count: executives.length },
    { key: 'member', label: 'সদস্যবৃন্দ', count: members.length },
  ]
  return all.filter((t) => t.key === 'all' || t.count > 0)
})

watch([query, group], () => (visible.value = PAGE))
function reset() {
  query.value = ''
  group.value = 'all'
}
</script>

<template>
  <div>
    <PageHero
      title="আমাদের টিম"
      subtitle="ঐক্য মানে একসাথে চলা। এখানে তাদের সাথে পরিচিত হোন, যারা প্রতিদিন মানুষের পাশে আছেন।"
      :crumbs="[{ label: 'হোম', to: '/' }, { label: 'টিম' }]"
    />

    <!-- সার্চ ও ফিল্টার -->
    <section class="border-b border-blue/10 bg-white py-6" aria-label="টিমের সদস্য খুঁজুন">
      <div class="container-page flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="relative w-full lg:max-w-md">
          <label for="team-search" class="sr-only">নাম বা পদবী দিয়ে খুঁজুন</label>
          <AppIcon name="search" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/60" />
          <input
            id="team-search"
            v-model="query"
            type="search"
            placeholder="নাম বা পদবী দিয়ে খুঁজুন"
            class="w-full rounded-full border border-blue/20 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue focus:ring-2 focus:ring-sky"
          />
        </div>
        <div class="flex flex-wrap gap-2" role="group" aria-label="দল অনুযায়ী ফিল্টার">
          <button
            v-for="t in tabs"
            :key="t.key"
            type="button"
            class="rounded-full border-2 px-4 py-2 font-medium transition-colors duration-200"
            :class="group === t.key ? 'border-blue bg-blue text-white' : 'border-blue/20 bg-white text-navy hover:border-blue'"
            :aria-pressed="group === t.key"
            @click="group = t.key"
          >
            {{ t.label }} <span class="ml-1 text-sm opacity-80">({{ toBn(t.count) }})</span>
          </button>
        </div>
      </div>
      <p class="sr-only" aria-live="polite">{{ toBn(total) }} জন পাওয়া গেছে</p>
    </section>

    <section v-if="founderList.length" class="section">
      <div class="container-page space-y-8">
        <SectionHeading title="প্রতিষ্ঠাতা" accent="blue" />
        <Reveal v-for="f in founderList" :key="f.name"><FounderCard :member="f" /></Reveal>
      </div>
    </section>

    <section v-if="executiveList.length" class="section section-alt">
      <div class="container-page">
        <SectionHeading title="কার্যনির্বাহী কমিটি" subtitle="সংগঠনের দৈনন্দিন কাজ ও সিদ্ধান্তের দায়িত্বে যারা আছেন।" accent="green" />
        <div class="mt-12 flex flex-wrap justify-center gap-6">
          <Reveal v-for="(m, i) in executiveList" :key="m.name" :delay="(i % 4) * 80" class="w-full sm:w-auto">
            <TeamCard :member="m" :index="i" />
          </Reveal>
        </div>
      </div>
    </section>

    <section v-if="memberList.length" class="section">
      <div class="container-page">
        <SectionHeading title="সদস্যবৃন্দ" subtitle="মাঠে থেকে প্রতিটি কাজ বাস্তবে রূপ দেন যারা।" accent="sky" />
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <TeamCard v-for="(m, i) in memberShown" :key="m.name" :member="m" :index="i + 1" variant="compact" />
        </div>
        <div v-if="memberList.length > visible" class="mt-8 text-center">
          <button type="button" class="btn btn-outline" @click="visible += PAGE">
            আরও দেখুন ({{ toBn(memberList.length - visible) }} জন)
          </button>
        </div>
      </div>
    </section>

    <section v-if="!total" class="section">
      <div class="container-page">
        <div class="card mx-auto max-w-md p-10 text-center">
          <p class="text-lg font-semibold">কাউকে খুঁজে পাওয়া যায়নি</p>
          <p class="mt-2 text-navy/75">অন্য নাম বা দল দিয়ে চেষ্টা করুন।</p>
          <button type="button" class="btn btn-outline mt-5" @click="reset">সবাইকে দেখুন</button>
        </div>
      </div>
    </section>

    <CtaBand
      title="আমাদের সাথে যুক্ত হোন"
      text="সময় বা দক্ষতা, যা-ই দিতে পারেন, ঐক্যে আপনার জায়গা আছে।"
      button-label="যোগাযোগ করুন"
      to="/contact"
      :donate="false"
    >
      <a :href="site.facebookGroup" target="_blank" rel="noopener noreferrer" class="btn border-2 border-white/60 text-white hover:bg-white hover:text-blue">
        <AppIcon name="users" :size="18" /> ফেসবুক গ্রুপে আসুন
      </a>
    </CtaBand>
  </div>
</template>
