const BN_TO_EN: Record<string, string> = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' }
const toEn = (s: string) => s.replace(/[০-৯]/g, (d) => BN_TO_EN[d] ?? d)

/** প্রকল্পের date থেকে বছর বের করে। "2024-03-15", "১৫ মার্চ ২০২৪", "২০২৪", সবই চলে। না পেলে null। */
export function projectYear(date: string): number | null {
  const m = toEn(date).match(/(?:19|20)\d{2}/)
  return m ? Number(m[0]) : null
}

/** "১,২০০ জন" বা "1200" থেকে সংখ্যা। "[সংখ্যা]" -এর মতো placeholder হলে 0। */
export function beneficiaryCount(value: string): number {
  const m = toEn(value).replace(/,/g, '').match(/\d+/)
  return m ? Number(m[0]) : 0
}
