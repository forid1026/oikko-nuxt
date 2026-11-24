import { site } from '~/data/site'

interface PageSeo {
  title: string
  description: string
  /** og:image: /img/... বা পূর্ণ URL। না দিলে ডিফল্ট ছবি */
  image?: string
  path?: string
  /** true হলে শিরোনামের শেষে "| ঐক্য" যোগ হবে না (হোম পেজের জন্য) */
  noSuffix?: boolean
  noindex?: boolean
}

/** প্রতি পেজের বাংলা title, description ও Facebook/og preview এক জায়গা থেকে সেট করে */
export function usePageSeo(o: PageSeo) {
  const route = useRoute()
  const abs = (p: string) => (p.startsWith('http') ? p : `${site.url}${p}`)
  const title = o.noSuffix ? o.title : `${o.title} | ${site.name}`
  const image = abs(o.image ?? site.ogImage)
  const url = abs(o.path ?? route.path)

  useSeoMeta({
    title,
    description: o.description,
    ogTitle: title,
    ogDescription: o.description,
    ogImage: image,
    ogUrl: url,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: o.description,
    twitterImage: image,
    robots: o.noindex ? 'noindex, nofollow' : undefined,
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
