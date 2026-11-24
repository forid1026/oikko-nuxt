import { categoryOrder, type ProjectCategory } from '~/data/categories'
import type { ProjectItem } from '~/types/project'

export type CategoryFilter = 'all' | ProjectCategory

/**
 * ক্যাটাগরি (URL query-তে: ?category=food) ও নাম দিয়ে সার্চ।
 * static সাইটে server-এ query জানা থাকে না, তাই URL-এর মান mount-এর পরে বসানো হয় (hydration mismatch এড়াতে)।
 */
export function useProjectFilter(projects: Ref<ProjectItem[]>) {
  const route = useRoute()
  const router = useRouter()
  const category = ref<CategoryFilter>('all')
  const query = ref('')

  const isCategory = (v: unknown): v is ProjectCategory =>
    typeof v === 'string' && (categoryOrder as string[]).includes(v)

  function fromRoute() {
    const c = route.query.category
    category.value = isCategory(c) ? c : 'all'
  }
  onMounted(fromRoute)
  watch(() => route.query.category, fromRoute)

  function setCategory(c: CategoryFilter) {
    category.value = c
    router.replace({ query: { ...route.query, category: c === 'all' ? undefined : c } })
  }

  const filtered = computed(() => {
    const q = query.value.trim().toLowerCase()
    return projects.value.filter(
      (p) =>
        (category.value === 'all' || p.category === category.value) &&
        (!q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)),
    )
  })

  const counts = computed(() => {
    const result: Record<string, number> = { all: projects.value.length }
    for (const p of projects.value) result[p.category] = (result[p.category] ?? 0) + 1
    return result
  })

  return { category, query, filtered, counts, setCategory }
}
