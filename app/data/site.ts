// সংগঠনের মূল তথ্য: এক জায়গায় রাখা হয়েছে, যাতে বদলাতে হলে শুধু এখানেই বদলাতে হয়।

export interface NavItem {
  label: string
  to: string
}

export const site = {
  name: 'ঐক্য',
  nameEn: 'Oikko',
  tagline: '২০১৫ থেকে মানবতার পাশে',
  description:
    'ঐক্য একটি অলাভজনক স্বেচ্ছাসেবী সংগঠন। ২০১৫ সাল থেকে আমরা সারা বাংলাদেশে সুবিধাবঞ্চিত মানুষের পাশে আছি।',
  url: 'https://oikko-awo.com', // TODO: ডোমেইন চূড়ান্ত হলে নিশ্চিত করুন
  domain: 'oikko-awo.com',
  foundedYear: 2015,
  // সরকারি নিবন্ধন নম্বর (থাকলে লিখুন, যেমন: 'সমাজসেবা অধিদপ্তর নিবন্ধন নং ...')। খালি থাকলে কোথাও দেখানো হয় না।
  registration: '' as string,
  address: 'তেঁতুলিয়া, পঞ্চগড়, বাংলাদেশ',
  email: 'oikko.awo@gmail.com',
  phoneDisplay: '০১৭৩৮-৭৩৩৭৪৫',
  phoneHref: '+8801738733745',
  facebookPage: 'https://www.facebook.com/oikko.awo',
  // Google Maps: আপনার দেওয়া লিংক থেকে স্থান "Oikko (A Welfare Organization)" (২৬.৪৯৯০৪৪৮, ৮৮.৪৫৮৩৩৩৪)
  mapsLink: 'https://maps.app.goo.gl/CsD2N77kZBs8Wsvy9',
  mapsEmbed: 'https://maps.google.com/maps?q=26.4990448,88.4583334&hl=bn&z=16&output=embed',
  facebookGroup: 'https://www.facebook.com/groups/oikko.awo/',
  logo: '/logo.png', // TODO: public/logo.png ফাইলটি বসান
  // ডিফল্ট শেয়ার-ছবি। TODO: চাইলে ১২০০×৬৩০ আকারের আলাদা ছবি public/og-default.png বানিয়ে এখানে বদলান
  ogImage: '/logo.png',
  // TODO: Formspree-তে ফর্ম বানিয়ে আপনার ID বসান (README দেখুন)। [YOUR_ID] থাকলে ফর্ম পাঠাবে না।
  formspreeEndpoint: 'https://formspree.io/f/[YOUR_ID]',
  stats: {
    people: 3000,
    members: 100,
  },
} as const

export const navItems: NavItem[] = [
  { label: 'হোম', to: '/' },
  { label: 'আমাদের সম্পর্কে', to: '/about' },
  { label: 'প্রকল্প', to: '/projects' },
  { label: 'গ্যালারি', to: '/gallery' },
  { label: 'টিম', to: '/team' },
  { label: 'যোগাযোগ', to: '/contact' },
]
