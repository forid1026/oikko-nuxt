// "আমাদের মাইলফলক": শুধু প্রধান মুহূর্তগুলো। সর্বোচ্চ ১০টি স্লাইডারে দেখায়, বেশি হলে "সব মাইলফলক" বাটনে পুরো তালিকা।
// TODO: নিচের সবকিছু placeholder। আসল বছর, শিরোনাম ও ১–২ লাইন আপনি দেবেন।
// color: 'blue' | 'green' | 'sky' | 'orange' | 'pink'

export type MilestoneColor = 'blue' | 'green' | 'sky' | 'orange' | 'pink'

export interface Milestone {
  year: string
  title: string
  text: string
  color: MilestoneColor
}

export const milestones: Milestone[] = [
  { year: '[বছর]', title: '[যেমন: যাত্রা শুরু]', text: '[১–২ লাইনে লিখুন]', color: 'blue' },
  { year: '[বছর]', title: '[যেমন: প্রথম ঈদ বিতরণ]', text: '[১–২ লাইনে লিখুন]', color: 'orange' },
  { year: '[বছর]', title: '[যেমন: প্রথম বৃত্তি]', text: '[১–২ লাইনে লিখুন]', color: 'green' },
  { year: '[বছর]', title: '[যেমন: ১০০০তম উপকারভোগী]', text: '[১–২ লাইনে লিখুন]', color: 'sky' },
  { year: '[বছর]', title: '[যেমন: বন্যায় প্রথম সাড়া]', text: '[১–২ লাইনে লিখুন]', color: 'pink' },
  { year: '[বছর]', title: '[যেমন: স্বাবলম্বী প্রকল্প শুরু]', text: '[১–২ লাইনে লিখুন]', color: 'green' },
]
