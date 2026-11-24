// টিমের সদস্যদের তালিকা। নতুন সদস্য যোগ করতে শুধু নিচের তালিকায় একটি { ... } যোগ করুন।
// পেজ আপনাআপনি group ও order দেখে সাজাবে: ১ জন থেকে ১০০+ জন, সবই চলবে।
//
//  group: 'founder' (প্রতিষ্ঠাতা) | 'executive' (কার্যনির্বাহী কমিটি) | 'member' (সদস্য)
//  order: ছোট সংখ্যা আগে আসে (প্রতিটি group-এর ভেতরে)
//  photo: public/img/team/ ফোল্ডারে ছবি রেখে '/img/team/নাম.jpg' লিখুন (ঐচ্ছিক)
//  facebook, quote: ঐচ্ছিক

export type TeamGroup = 'founder' | 'executive' | 'member'

export interface TeamMember {
  name: string
  nameEn: string
  role: string
  group: TeamGroup
  order: number
  photo?: string
  facebook?: string
  quote?: string
}

export const team: TeamMember[] = [
  // TODO: নাম যাচাই করুন
  { name: 'হাবিবুর রহমান হিমু', nameEn: 'Habibur Rahman Hemu', role: 'প্রতিষ্ঠাতা', group: 'founder', order: 0, photo: '/img/team/hemu.jpg' },
  // TODO: নাম যাচাই করুন
  { name: 'হারুন-অর-রশিদ', nameEn: 'Harun ur Rashid', role: 'সভাপতি', group: 'executive', order: 1, photo: '/img/team/harun.jpg' },
  // TODO: নাম যাচাই করুন
  { name: 'এম. এ. হান্নান', nameEn: 'M.A Hannan', role: 'সহ-সভাপতি', group: 'executive', order: 2, photo: '/img/team/hannan.jpg' },
  // TODO: নাম যাচাই করুন
  { name: 'জ্যোতি', nameEn: 'Joty', role: 'সহ-সভাপতি', group: 'executive', order: 3 },
  // TODO: নাম ও ইংরেজি বানান যাচাই করুন (ইংরেজি বানান নিশ্চিত নয়: "Faird" নাকি "Farid")
  { name: 'শেখ ফরিদ', nameEn: 'Sheikh Faird', role: 'সদস্য', group: 'member', order: 4, photo: '/img/team/farid.jpg' },
]

const byOrder = (a: TeamMember, b: TeamMember) => a.order - b.order || a.name.localeCompare(b.name, 'bn')

export const founders = team.filter((m) => m.group === 'founder').sort(byOrder)
export const executives = team.filter((m) => m.group === 'executive').sort(byOrder)
export const members = team.filter((m) => m.group === 'member').sort(byOrder)
