export interface HeaderLogo {
  url: string
  alt: string
  width: number
  height: number
}

export interface HeaderNavItem {
  label: string
  url: string
  targetBlank: boolean
}

export interface HeaderButton {
  buttonText: string
  buttonUrl: string
  buttonStyle: 'primary' | 'secondary' | 'text' | 'underline'
  activeState: boolean
}

export interface HeaderCtaButton {
  enabled: boolean
  text: string
  url: string
  style: string
}

export interface HeaderSettings {
  logo?: HeaderLogo
  navigation: HeaderNavItem[]
  buttons: HeaderButton[]
  ctaButton?: HeaderCtaButton | null
  style: 'transparent' | 'white' | 'dark'
  sticky: boolean
  transparent?: boolean
}

export interface HeaderResponse {
  headerSettings: HeaderSettings
}