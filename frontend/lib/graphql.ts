import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.WORDPRESS_API_URL || 'http://localhost/graphql'

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
})

export const HEADER_QUERY = `
  query GetHeaderSettings {
    headerSettings {
      logo {
        url
        alt
        width
        height
      }
      navigation {
        label
        url
        targetBlank
      }
      buttons {
        buttonText
        buttonUrl
        buttonStyle
        activeState
      }
      ctaButton {
        enabled
        text
        url
        style
      }
      style
      sticky
      transparent
    }
  }
`

export const HERO_SLIDER_QUERY = `
  query HeroSlider {
    heroSlider {
      id
      title
      headline
      founderName
      founderTitle
      desktopImage
      mobileImage
    }
  }
`