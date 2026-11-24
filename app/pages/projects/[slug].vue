<script setup lang="ts">
import { categories } from '~/data/categories'
import type { LightboxItem, ProjectItem } from '~/types/project'

const route = useRoute()
const slug = String(route.params.slug)

const { data: page } = await useAsyncData(`project-${slug}`, () =>
  queryCollection('projects').path(`/projects/${slug}`).first(),
)
// slug না মিললে ৪০৪
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'প্রকল্পটি পাওয়া যায়নি', fatal: true })
}

const { data: all } = await useAsyncData('projects-all', () => queryCollection('projects').order('order', 'ASC').all())
const projects = computed(() => (all.value ?? []) as ProjectItem[])

const meta = computed(() => categories[page.value!.category])

// প্রতিটি প্রকল্পের নিজস্ব title, description ও og:image (cover)
usePageSeo({
  title: page.value.title,
  description: page.value.summary,
  image: page.value.cover,
  path: page.value.path,
})

const infoCards = computed(() => [
  { icon: 'calendar' as const, label: 'তারিখ', value: page.value!.date },
  { icon: 'pin' as const, label: 'স্থান', value: page.value!.location },
  { icon: 'users' as const, label: 'উপকারভোগী', value: page.value!.beneficiaries },
  { icon: 'flag' as const, label: 'অবস্থা', value: page.value!.statusLabel },
])

const galleryItems = computed<LightboxItem[]>(() =>
  (page.value!.gallery ?? []).map((src, i) => ({
    src,
    alt: `${page.value!.title} প্রকল্পের ছবি ${toBn(i + 1)}`,
    category: page.value!.category,
  })),
)

// "আরও প্রকল্প": একই ক্যাটাগরির ৩টি, না থাকলে অন্যগুলো দিয়ে পূরণ
const related = computed(() => {
  const others = projects.value.filter((p) => p.path !== page.value!.path)
  const same = others.filter((p) => p.category === page.value!.category)
  const rest = others.filter((p) => p.category !== page.value!.category)
  return [...same, ...rest].slice(0, 3)
})

const position = computed(() => projects.value.findIndex((p) => p.path === page.value!.path))
const prevProject = computed(() => (position.value > 0 ? projects.value[position.value - 1] : null))
const nextProject = computed(() =>
  position.value >= 0 && position.value < projects.value.length - 1 ? projects.value[position.value + 1] : null,
)
</script>

<template>
  <div v-if="page" class="pb-24 lg:pb-0">
    <div class="container-page py-4">
      <Breadcrumb :items="[{ label: 'হোম', to: '/' }, { label: 'প্রকল্প', to: '/projects' }, { label: page.title }]" />
    </div>

    <!-- Hero -->
    <section class="relative isolate min-h-[22rem] overflow-hidden bg-blue text-white md:min-h-[26rem]">
      <div class="img-overlay absolute inset-0">
        <CoverImage :src="page.cover" :alt="`${page.title} প্রকল্পের ছবি`" :category="page.category" ratio="auto" eager sizes="100vw" class="h-full" />
      </div>
      <div class="container-page relative z-10 flex min-h-[22rem] flex-col justify-end py-10 md:min-h-[26rem]">
        <div class="mb-4 flex flex-wrap gap-2">
          <span class="rounded-full px-4 py-1 text-sm font-semibold" :class="meta.badge">{{ page.categoryLabel }}</span>
          <span class="rounded-full bg-white px-4 py-1 text-sm font-semibold text-navy">{{ page.statusLabel }}</span>
        </div>
        <h1 class="!text-white">{{ page.title }}</h1>
      </div>
    </section>

    <!-- তথ্য-বার -->
    <section class="container-page py-8">
      <dl class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div v-for="info in infoCards" :key="info.label" class="card flex items-start gap-3 p-4">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-blue"><AppIcon :name="info.icon" /></span>
          <div class="min-w-0">
            <dt class="text-sm text-navy/70">{{ info.label }}</dt>
            <dd class="break-words font-semibold">{{ info.value }}</dd>
          </div>
        </div>
      </dl>
    </section>

    <!-- মূল অংশ -->
    <section class="container-page pb-16">
      <div class="grid gap-10 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <p class="text-xl text-navy/90">{{ page.summary }}</p>

          <ContentRenderer :value="page" class="prose-oikko mt-6" />

          <div class="card mt-10 border-l-4 border-blue p-6">
            <h2 class="!text-xl">আমাদের লক্ষ্য</h2>
            <p class="mt-2">{{ page.goal }}</p>
          </div>

          <h2 class="mt-12 !text-2xl">যা অর্জিত হয়েছে</h2>
          <ul class="mt-4 space-y-3">
            <li v-for="(o, i) in page.outcomes" :key="i" class="flex gap-3">
              <span class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-700 text-white"><AppIcon name="check" :size="14" /></span>
              <span>{{ o }}</span>
            </li>
          </ul>
        </div>

        <aside class="lg:sticky lg:top-28 lg:self-start">
          <div class="card p-6">
            <h2 class="!text-xl">এই কাজে পাশে থাকুন</h2>
            <p class="mt-2 text-navy/80">আপনার দান সরাসরি এ ধরনের কাজে ব্যবহার হয়।</p>
            <NuxtLink to="/donate" class="btn btn-donate mt-5 w-full"><AppIcon name="heart" :size="18" /> দান করুন</NuxtLink>
            <div class="mt-6 border-t border-blue/10 pt-5">
              <p class="mb-3 font-semibold">শেয়ার করুন</p>
              <ShareButtons :title="page.title" :path="page.path" />
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- গ্যালারি -->
    <section class="section section-alt">
      <div class="container-page">
        <SectionHeading title="প্রকল্পের গ্যালারি" accent="sky" align="left" />
        <div class="mt-8">
          <GalleryGrid v-if="galleryItems.length" :items="galleryItems" />
          <p v-else class="card p-8 text-center text-navy/75">এই প্রকল্পের ছবি শীঘ্রই যুক্ত করা হবে।</p>
        </div>
      </div>
    </section>

    <!-- যারা কাজটি করেছেন -->
    <section v-if="page.team?.length" class="section">
      <div class="container-page">
        <SectionHeading title="যারা কাজটি করেছেন" accent="green" align="left" />
        <ul class="mt-8 flex flex-wrap gap-3">
          <li v-for="(member, i) in page.team" :key="i" class="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-medium">
            <AppIcon name="users" :size="16" /> {{ member }}
          </li>
        </ul>
        <p class="mt-4 text-sm">
          <NuxtLink to="/team" class="text-blue underline underline-offset-4">পুরো টিম দেখুন</NuxtLink>
        </p>
      </div>
    </section>

    <!-- আরও প্রকল্প -->
    <section v-if="related.length" class="section section-alt">
      <div class="container-page">
        <SectionHeading title="আরও প্রকল্প" accent="blue" align="left" />
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="p in related" :key="p.path" :project="p" />
        </div>

        <nav class="mt-10 flex flex-col justify-between gap-4 sm:flex-row" aria-label="আগের ও পরের প্রকল্প">
          <NuxtLink v-if="prevProject" :to="prevProject.path" class="card card-hover flex items-center gap-3 p-4 sm:max-w-[48%]">
            <AppIcon name="arrow-left" class="shrink-0 text-blue" />
            <span><span class="block text-sm text-navy/70">আগের প্রকল্প</span><span class="font-semibold">{{ prevProject.title }}</span></span>
          </NuxtLink>
          <span v-else />
          <NuxtLink v-if="nextProject" :to="nextProject.path" class="card card-hover flex items-center justify-end gap-3 p-4 text-right sm:max-w-[48%]">
            <span><span class="block text-sm text-navy/70">পরের প্রকল্প</span><span class="font-semibold">{{ nextProject.title }}</span></span>
            <AppIcon name="arrow-right" class="shrink-0 text-blue" />
          </NuxtLink>
        </nav>
      </div>
    </section>

    <!-- মোবাইলে নিচে স্থির "দান করুন" বার -->
    <div class="fixed inset-x-0 bottom-0 z-40 border-t border-blue/10 bg-white/95 p-3 backdrop-blur-md lg:hidden">
      <NuxtLink to="/donate" class="btn btn-donate w-full"><AppIcon name="heart" :size="18" /> দান করুন</NuxtLink>
    </div>
  </div>
</template>
