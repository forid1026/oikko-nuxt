# ঐক্য (Oikko) ওয়েবসাইট

অলাভজনক স্বেচ্ছাসেবী সংগঠন "ঐক্য"-এর সম্পূর্ণ static, বাংলা ভাষার ওয়েবসাইট।
Nuxt 4 · Vue 3 · TypeScript · Tailwind CSS v4 · @nuxt/content · @nuxt/image · @nuxt/fonts · @nuxtjs/sitemap

## স্থানীয়ভাবে চালানো

Node.js ২২ বা তার উপরের সংস্করণ লাগবে।

```bash
npm install
npm run dev          # http://localhost:3000
```

| কমান্ড | কাজ |
| --- | --- |
| `npm run dev` | ডেভেলপমেন্ট সার্ভার |
| `npm run generate` | সম্পূর্ণ static সাইট তৈরি (`.output/public`) |
| `npm run preview` | তৈরি সাইট স্থানীয়ভাবে দেখা |
| `npm run typecheck` | TypeScript পরীক্ষা |

## ফোল্ডার কাঠামো

```
app/                 সোর্স কোড (Nuxt 4)
  components/        UI component
  composables/       useReveal, useCountUp, useCopy, useProjectFilter, useLightbox, useBnNumber, usePageSeo
  dev-pages/         font-test.vue (শুধু dev-এ /dev/font-test, production build-এ নেই)
  data/              site.ts, team.ts, gallery.ts, donation.ts, categories.ts
  layouts/ pages/    লেআউট ও পেজ
  assets/css/main.css  রঙ, ফন্ট (@theme) ও সাধারণ স্টাইল
content/projects/    প্রতিটি প্রকল্প একটি .md ফাইল
public/              logo.png, robots.txt ও ছবি (public/img/...)
```

## নতুন প্রকল্প যোগ করা

১. `content/projects/` ফোল্ডারে নতুন ফাইল বানান, যেমন `winter-2026.md`। **ফাইলের নামই URL হবে** (`/projects/winter-2026`)।
২. একটি পুরোনো ফাইল কপি করে frontmatter বদলান। `category` হবে এগুলোর একটি:
`education`, `food`, `clothing`, `disaster`, `environment`, `selfreliance`।
৩. `order` সংখ্যা দিয়ে তালিকার ক্রম ঠিক করুন (ছোট সংখ্যা আগে)।
৪. ছবি `public/img/projects/` ফোল্ডারে রেখে `cover: /img/projects/winter-2026.jpg` এবং `gallery:` তালিকায় দিন।
৫. `---` এর নিচের অংশে Markdown-এ বিবরণ লিখুন।

**বছর-ট্যাব:** `/about`-এর "বছর ধরে আমাদের কাজ" প্রকল্পের `date` থেকে বছর বের করে (যেমন `2024-03-15`, `২০২৪` বা `১৫ মার্চ ২০২৪`)। বছর বোঝা না গেলে (যেমন `[তারিখ]`) প্রকল্পটি ওই অংশে আসে না। উপকারভোগীর যোগফলও `beneficiaries` থেকে আসে (যেমন `১,২০০ জন`)।

নতুন ফাইল যোগ করলে প্রকল্পের পেজ, প্রকল্পের তালিকা, sitemap ও "আগের/পরের" লিংক নিজে থেকেই হালনাগাদ হয়।

## নম্বর ও তথ্য বদলানো

- **দানের নম্বর ও ব্যাংকের তথ্য:** `app/data/donation.ts`
- **ঠিকানা, ফোন, ইমেইল, ফেসবুক লিংক, মেনু:** `app/data/site.ts`
- **টিমের সদস্য:** `app/data/team.ts`। নতুন সদস্য যোগ করতে একটি লাইন যোগ করুন, `group` (`founder`/`executive`/`member`) ও `order` দেখে পেজ আপনাআপনি সাজে। সদস্য ১২ জনের বেশি হলে সার্চ ও "আরও দেখুন" নিজে থেকেই আসে। ছবি `public/img/team/`-এ রেখে `photo:` দিন।
- **প্রতিষ্ঠাতার কথা:** `app/data/founder.ts` (শুধু লেখা বদলালেই /about ও হোম বদলায়)
- **হোমের hero slider:** `app/data/slides.ts` (ছবি `public/img/slides/`-এ)
- **মাইলফলক:** `app/data/milestones.ts` (সর্বোচ্চ ১০টি স্লাইডারে, বেশি হলে "সব মাইলফলক" বাটন)
- **হোমের "আমাদের কাজ" carousel:** প্রকল্পের ফাইলে `featured: true` দিলে আসে
- **গ্যালারির ছবি:** `app/data/gallery.ts` (ছবি `public/img/gallery/`-এ)

দানের নম্বর পাতায় বাংলা অঙ্কে দেখায়, কিন্তু "কপি" করলে ইংরেজি অঙ্ক যায় (`copyValue`), যাতে ব্যাংকিং অ্যাপে সরাসরি পেস্ট করা যায়।
**প্রকাশের আগে নম্বরগুলো আরেকবার মিলিয়ে নিন।**

## যোগাযোগ ফর্ম (Formspree) চালু করা

১. https://formspree.io-তে অ্যাকাউন্ট খুলে একটি নতুন ফর্ম বানান, ইমেইল হিসেবে `oikko.awo@gmail.com` দিন।
২. ফর্মের endpoint দেখতে এমন: `https://formspree.io/f/abcdwxyz`। শেষের অংশটি আপনার ID।
৩. `app/data/site.ts` ফাইলে বদলান:

```ts
formspreeEndpoint: 'https://formspree.io/f/আপনার_ID',
```

ID না বসানো পর্যন্ত ফর্ম কিছু পাঠায় না, দর্শককে সরাসরি ইমেইল করতে বলে।

## ডিপ্লয়

`npm run generate` চালালে `.output/public` ফোল্ডারে সম্পূর্ণ static সাইট তৈরি হয়।

**Cloudflare Pages / Netlify**
- Build command: `npm run generate`
- Output directory: `.output/public`
- Node সংস্করণ: ২২ বা ২৪

**GitHub Pages**
- `.output/public` ফোল্ডারের বিষয়বস্তু `gh-pages` branch বা Pages-এর উৎসে দিন।
- নিজস্ব ডোমেইন (`oikko-awo.com`) হলে `public/CNAME` ফাইলে শুধু ডোমেইনটি লিখুন।
- `username.github.io/repo` ঠিকানায় চালালে `NUXT_APP_BASE_URL=/repo/` সেট করে build করতে হবে।

ডোমেইন বদলালে `nuxt.config.ts`-এর `site.url`, `app/data/site.ts`-এর `url` এবং `public/robots.txt` তিন জায়গাতেই বদলান।

## আমাকে যা পূরণ করতে হবে (চেকলিস্ট)

- [ ] `app/data/donation.ts`: bKash/Nagad/Rocket-এর অ্যাকাউন্টের ধরন (Personal/Merchant/Agent) ও ব্যাংকের রাউটিং নম্বর
- [ ] `app/data/donation.ts`: "কত টাকায় কী হয়" এর ৪টি অঙ্ক ও বিবরণ
- [ ] ব্যাংকের বানান মিলিয়ে নেওয়া: "অগ্রনী ব্যাংক", "শানবাহানহাট শাখা"
- [ ] `app/data/site.ts`: Formspree ID
- [ ] `content/projects/*.md`: তারিখ, স্থান, উপকারভোগীর সংখ্যা, লক্ষ্য, ফলাফল, cover ও gallery ছবি, টিমের নাম, আসল `status`
- [ ] `app/data/gallery.ts`: আসল ছবি, alt ও caption
- [ ] `app/pages/index.vue`: উপকারভোগীর গল্প (অনুমতি নিয়ে)
- [ ] `app/pages/about.vue`: প্রতিষ্ঠার গল্প, ভিশন (যাচাই), স্বচ্ছতার পদ্ধতি
- [ ] `app/data/founder.ts`: প্রতিষ্ঠাতার উক্তি ও তিনটি অনুচ্ছেদ (কাঁচা উত্তর দিলে সম্পাদনা করে দেওয়া হবে)
- [ ] `app/data/milestones.ts`: ৬–৮টি মাইলফলকের বছর, শিরোনাম ও লেখা
- [ ] `app/data/slides.ts`: hero slider-এর আসল ছবি
- [ ] `app/data/team.ts`: নামের বানান যাচাই (বিশেষ করে "Sheikh Faird"), বাকি সদস্য, ছবি
- [ ] প্রকল্পের `date` এমন ফরম্যাটে দিন, যাতে বছর বোঝা যায় (যেমন `2024-03-15`)
- [ ] `public/og-default.png` (১২০০×৬৩০, ঐচ্ছিক): বানালে `app/data/site.ts`-এর `ogImage` বদলান
- [ ] ডোমেইন ঠিক আছে কিনা মিলিয়ে নেওয়া (`https://oikko-awo.com`)
- [ ] স্থানীয় ব্রাউজারে সব পেজ ঘুরে দেখা এবং Lighthouse চালানো
