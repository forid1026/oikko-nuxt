import type { ProjectCategory } from '~/data/categories'

/** কার্ড, ফিল্টার ও তালিকায় যে ক্ষেত্রগুলো লাগে (Nuxt Content-এর ফল এর চেয়ে বড়, কিন্তু এখানে মিলে যায়) */
export interface ProjectItem {
  path: string
  title: string
  slug: string
  category: ProjectCategory
  categoryLabel: string
  status: 'ongoing' | 'completed'
  statusLabel: string
  summary: string
  beneficiaries: string
  cover?: string
  order: number
  date: string
  featured?: boolean
}

export interface LightboxItem {
  src?: string
  alt: string
  caption?: string
  width?: number
  height?: number
  category?: ProjectCategory
}
