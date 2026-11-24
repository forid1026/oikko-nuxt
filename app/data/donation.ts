// দান-সংক্রান্ত তথ্য। নম্বরগুলো আপনার দেওয়া, আমি কিছু বানাইনি। [ ] চিহ্নিত অংশ এখনো ফাঁকা।
// প্রকাশের আগে নম্বরগুলো আরেকবার মিলিয়ে নিন: ভুল নম্বর মানে দাতার টাকা অন্য কারও কাছে যেতে পারে।

/** true হলে এখনো placeholder আছে (কপি button নিষ্ক্রিয় দেখানো যাবে) */
export const isPlaceholder = (value: string) => value.startsWith('[')

export interface MobileBanking {
  id: 'bkash' | 'nagad' | 'rocket'
  name: string
  /** পেজে যে নম্বর দেখানো হবে (বাংলা অঙ্কে) */
  number: string
  /** কপি করলে যা ক্লিপবোর্ডে যাবে: ইংরেজি অঙ্ক, যাতে অ্যাপে সরাসরি পেস্ট করা যায় */
  copyValue: string
  accountType: string // Personal / Merchant / Agent
  tone: 'pink' | 'orange' | 'blue'
}

// নম্বর আপনার দেওয়া তথ্য থেকে। TODO: অ্যাকাউন্টের ধরন (Personal/Merchant/Agent) আপনাকে জানাতে হবে।
export const mobileBanking: MobileBanking[] = [
  { id: 'bkash', name: 'bKash', number: '০১৭৩৮-৭৩৩৭৪৫', copyValue: '01738733745', accountType: '[Personal/Merchant/Agent]', tone: 'pink' },
  { id: 'nagad', name: 'Nagad', number: '০১৭৩৮-৭৩৩৭৪৫', copyValue: '01738733745', accountType: '[Personal/Merchant/Agent]', tone: 'orange' },
  { id: 'rocket', name: 'Rocket', number: '০১৭৩৮-৭৩৩৭৪৫', copyValue: '01738733745', accountType: '[Personal/Merchant/Agent]', tone: 'blue' },
]

export interface BankField {
  label: string
  value: string
  /** কপি করলে যা যাবে (না থাকলে value) */
  copyValue?: string
}

// ব্যাংকের তথ্য আপনার দেওয়া। TODO: রাউটিং নম্বর আপনাকে জানাতে হবে।
export const bankTransfer: BankField[] = [
  { label: 'ব্যাংকের নাম', value: 'অগ্রনী ব্যাংক পিএলসি' },
  { label: 'শাখা', value: 'শানবাহানহাট শাখা, তেতুলিয়া, পঞ্চগড়' },
  { label: 'অ্যাকাউন্টের নাম', value: 'ঐক্য (OIKKO)', copyValue: 'OIKKO' },
  { label: 'অ্যাকাউন্ট নম্বর', value: '০২০০০১০১৭১৭৩৫', copyValue: '0200010171735' },
  { label: 'রাউটিং নম্বর', value: '[রাউটিং নম্বর এখানে]' },
]

/** "কত টাকায় কী হয়": অঙ্ক ও বিবরণ আপনি ঠিক করে দেবেন */
export interface ImpactTier {
  amount: string
  title: string
  description: string
}

export const impactTiers: ImpactTier[] = [
  { amount: '[টাকার অঙ্ক]', title: '[যেমন: একটি পরিবারের খাবার]', description: '[এই অঙ্কে ঠিক কী করা যায়, এক-দুই লাইনে লিখুন]' },
  { amount: '[টাকার অঙ্ক]', title: '[যেমন: একজন শিক্ষার্থীর বই-খাতা]', description: '[এই অঙ্কে ঠিক কী করা যায়, এক-দুই লাইনে লিখুন]' },
  { amount: '[টাকার অঙ্ক]', title: '[যেমন: একটি শীতবস্ত্র]', description: '[এই অঙ্কে ঠিক কী করা যায়, এক-দুই লাইনে লিখুন]' },
  { amount: '[টাকার অঙ্ক]', title: '[যেমন: স্বাবলম্বী প্রকল্পে অংশ]', description: '[এই অঙ্কে ঠিক কী করা যায়, এক-দুই লাইনে লিখুন]' },
]

export const confirmationSteps = [
  'আপনার পছন্দের মাধ্যমে দান পাঠান।',
  'ট্রানজেকশন আইডি ও আপনার নাম লিখে রাখুন। নাম প্রকাশে আপত্তি থাকলে সেটাও জানান।',
  'ইমেইলে বা ফেসবুক পেজে আমাদের জানান। আমরা প্রাপ্তি নিশ্চিত করব।',
]

export const warningText =
  'অনুগ্রহ করে শুধু এই পেজে দেওয়া নম্বরেই দান করুন। সন্দেহ হলে আমাদের সাথে যোগাযোগ করুন।'

// TODO: আসলেই হিসাব প্রকাশ করলে তবেই এই বার্তা রাখুন; না করলে বাক্যটি বদলান।
export const transparencyText =
  'দানের হিসাব আমরা নিয়মিত প্রকাশ করতে চাই। কোন দান কোন কাজে লেগেছে, তা ফেসবুক পেজ ও এই সাইটে জানানো হবে।'
