// প্রকল্প ও গ্যালারির ক্যাটাগরি, রঙ সহ।
// Tailwind শুধু সম্পূর্ণ class নাম খুঁজে পায়, তাই এখানে class-গুলো পুরো লেখা হয়েছে (জোড়া লাগানো নয়)।
// সাদা লেখা শুধু গাঢ় রঙে; কমলা ও আকাশির মতো হালকা/মাঝারি রঙে গাঢ় নীল লেখা (contrast-এর জন্য)।

export type ProjectCategory = 'education' | 'food' | 'clothing' | 'disaster' | 'environment' | 'selfreliance'

export interface CategoryMeta {
  key: ProjectCategory
  label: string
  /** ছোট badge: background + লেখা */
  badge: string
  /** card-এর উপরের রঙিন দাগ বা placeholder ছবির background */
  surface: string
  icon: 'book' | 'food' | 'shirt' | 'alert' | 'leaf' | 'home'
}

export const categories: Record<ProjectCategory, CategoryMeta> = {
  food: { key: 'food', label: 'খাদ্য', badge: 'bg-orange text-navy', surface: 'bg-orange', icon: 'food' },
  education: { key: 'education', label: 'শিক্ষা', badge: 'bg-blue text-white', surface: 'bg-blue', icon: 'book' },
  clothing: { key: 'clothing', label: 'বস্ত্র', badge: 'bg-sky text-navy', surface: 'bg-sky', icon: 'shirt' },
  disaster: { key: 'disaster', label: 'দুর্যোগ', badge: 'bg-pink text-white', surface: 'bg-pink', icon: 'alert' },
  environment: { key: 'environment', label: 'পরিবেশ', badge: 'bg-green text-navy', surface: 'bg-green', icon: 'leaf' },
  selfreliance: { key: 'selfreliance', label: 'স্বাবলম্বন', badge: 'bg-selfreliance text-white', surface: 'bg-selfreliance', icon: 'home' },
}

/** ফিল্টার ট্যাবের ক্রম */
export const categoryOrder: ProjectCategory[] = ['education', 'food', 'clothing', 'disaster', 'environment', 'selfreliance']

export const statusLabels = { ongoing: 'চলমান', completed: 'সম্পন্ন' } as const
