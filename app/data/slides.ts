import type { ProjectCategory } from './categories'

// হোমের hero slider: ৪–৫টি স্লাইড। ছবি বদলাতে public/img/slides/-তে ফাইল রেখে image: '/img/slides/নাম.jpg' দিন।
// image না থাকলে ক্যাটাগরির রঙের gradient + আইকন দেখায়। ছবি দিলে পুরো প্রস্থে (১৬০০×৯০০ বা বড়) দিন।
// TODO: শিরোনাম ও বর্ণনা আমি আপনার দেওয়া কাজের তালিকা থেকে লিখেছি; আপনার ভাষায় বদলে নিতে পারেন।

export interface Slide {
  id: string
  category: ProjectCategory
  title: string
  text: string
  /** "বিস্তারিত দেখুন" বাটনের লিংক */
  href: string
  image?: string
  imageAlt: string
}

export const slides: Slide[] = [
  {
    id: 'eid',
    category: 'food',
    title: 'ঈদের দিনে কারও ঘর যেন খালি না থাকে',
    text: 'প্রতি ঈদে আমরা অসহায় পরিবারের ঘরে খাবার পৌঁছে দিই।',
    href: '/projects/eid-food-distribution',
    imageAlt: 'ঈদে খাবার বিতরণের ছবি',
  },
  {
    id: 'scholarship',
    category: 'education',
    title: 'অভাবে যেন কারও পড়া থেমে না যায়',
    text: 'গরিব শিক্ষার্থীদের পাশে আছি বৃত্তি ও শিক্ষাসামগ্রী নিয়ে।',
    href: '/projects/student-scholarship',
    imageAlt: 'শিক্ষার্থী বৃত্তির ছবি',
  },
  {
    id: 'flood',
    category: 'disaster',
    title: 'দুর্যোগে সবার আগে পাশে',
    text: 'বন্যায় ক্ষতিগ্রস্ত পরিবারের কাছে খাবার, পানি ও জরুরি সামগ্রী নিয়ে।',
    href: '/projects/flood-relief',
    imageAlt: 'বন্যার্তদের সহায়তার ছবি',
  },
  {
    id: 'tree',
    category: 'environment',
    title: 'জন্মদিনে একটি গাছ, আগামীর জন্য একটু ছায়া',
    text: 'জন্মদিনের আনন্দকে আমরা জুড়ে দিই একটি চারার সাথে।',
    href: '/projects/birthday-tree-planting',
    imageAlt: 'বৃক্ষরোপণের ছবি',
  },
  {
    id: 'selfreliance',
    category: 'selfreliance',
    title: 'নিজের পায়ে দাঁড়ানোর স্বপ্ন',
    text: 'আমাদের লক্ষ্য, মানুষকে আর কারও কাছে হাত পাততে না হওয়া।',
    href: '/projects/self-reliance-project',
    imageAlt: 'স্বাবলম্বী প্রকল্পের ছবি',
  },
]
