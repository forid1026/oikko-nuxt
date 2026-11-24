import type { ProjectCategory } from './categories'

// TODO: আসল ছবি public/img/gallery/-তে রেখে src: '/img/gallery/নাম.jpg' দিন এবং alt ও caption বদলান।
// src না থাকলে রঙিন placeholder দেখায়। width/height দিলে masonry grid-এ লাফ (layout shift) হয় না।

export interface GalleryItem {
  id: string
  category: ProjectCategory
  alt: string
  caption: string
  src?: string
  width: number
  height: number
}

// placeholder-এর আকার বিভিন্ন রাখা হয়েছে, যাতে masonry layout পরীক্ষা করা যায়
export const gallery: GalleryItem[] = [
  { id: 'g1', category: 'food', alt: '[ঈদে খাবার বিতরণের ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 1200, height: 800 },
  { id: 'g2', category: 'education', alt: '[শিক্ষা বৃত্তি অনুষ্ঠানের ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 800, height: 1000 },
  { id: 'g3', category: 'clothing', alt: '[বস্ত্র বিতরণের ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 1200, height: 900 },
  { id: 'g4', category: 'disaster', alt: '[বন্যার্তদের সহায়তার ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 1000, height: 1200 },
  { id: 'g5', category: 'environment', alt: '[বৃক্ষরোপণের ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 1200, height: 800 },
  { id: 'g6', category: 'selfreliance', alt: '[স্বাবলম্বী প্রকল্পের ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 900, height: 900 },
  { id: 'g7', category: 'food', alt: '[খাদ্য বিতরণের ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 800, height: 1100 },
  { id: 'g8', category: 'education', alt: '[শিক্ষার্থীদের ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 1200, height: 800 },
  { id: 'g9', category: 'clothing', alt: '[শীতবস্ত্র বিতরণের ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 1000, height: 1000 },
  { id: 'g10', category: 'environment', alt: '[গাছ লাগানোর ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 800, height: 1000 },
  { id: 'g11', category: 'disaster', alt: '[ত্রাণ বিতরণের ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 1200, height: 800 },
  { id: 'g12', category: 'selfreliance', alt: '[স্বেচ্ছাসেবকদের ছবির বর্ণনা]', caption: '[ক্যাপশন]', width: 1100, height: 800 },
]
