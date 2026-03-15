export interface HeroSlide {
  id: string
  title: string
  headline: string
  founderName: string
  founderTitle: string
  desktopImage: string
  mobileImage: string
}

export interface HeroSliderResponse {
  heroSlider: HeroSlide[]
}
