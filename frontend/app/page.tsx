import type { Metadata } from 'next'
import HeroSlider from '@/components/HeroSlider'
import { graphqlClient, HERO_SLIDER_QUERY } from '@/lib/graphql'
import type { HeroSliderResponse } from '@/types/hero'

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

export default async function HomePage() {
  const heroSlides = await getHeroSlides()

  return (
    <div>
      <HeroSlider slides={heroSlides} />
    </div>
  )
}