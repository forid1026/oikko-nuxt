const BN_DIGITS = '০১২৩৪৫৬৭৮৯'

/** ইংরেজি অঙ্ককে বাংলা অঙ্কে বদলায়: 3000 → ৩০০০ */
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d)
}

/** হাজারের কমা সহ বাংলা সংখ্যা: 12500 → ১২,৫০০ */
export function formatBn(value: number): string {
  return toBn(value.toLocaleString('en-US'))
}

export function useBnNumber() {
  return { toBn, formatBn }
}
