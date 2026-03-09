import type { Metadata } from 'next'
import HeroSlider from '@/components/HeroSlider'
import CrosslinkHighlights from '@/components/CrosslinkHighlights/CrosslinkHighlights'
import { graphqlClient, HERO_SLIDER_QUERY,CROSSLINK_HIGHLIGHTS_QUERY } from '@/lib/graphql'
import type { HeroSliderResponse } from '@/types/hero'
import { data } from 'autoprefixer'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Crosslink Capital – modern headless CMS site built with WordPress and Next.js.',
}

async function getHeroSlides() {
  try {
    const data: HeroSliderResponse = await graphqlClient.request(HERO_SLIDER_QUERY)
    return data.heroSlider ?? []
  } catch (error) {
    console.error('Error fetching hero slider:', error)
    return []
  }
}
async function getCrosslinkHighlights() {
  try {
    const data = await graphqlClient.request(CROSSLINK_HIGHLIGHTS_QUERY)
    return data?.page?.crosslinkHighlights ?? null
  } catch (error) {
    console.error('Error fetching highlights:', error)
    return null
  }
}
export default async function HomePage() {
  const heroSlides = await getHeroSlides()
  const highlightsData = await getCrosslinkHighlights()

  return (
    <div>
      <HeroSlider slides={heroSlides} />
      <CrosslinkHighlights data={highlightsData} />
    </div>
  )
}