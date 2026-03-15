'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './OurPortfolio.module.css'

type MediaNode = {
  node?: {
    sourceUrl?: string | null
    altText?: string | null
  } | null
} | null

type PortfolioSlide = {
  founderName?: string | null
  founderRole?: string | null
  slideLink?: string | null
  founderImage?: MediaNode
  companyLogo?: MediaNode
}

type OurPortfolioData = {
  sectionTitle?: string | null
  sectionDescription?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  portfolioSlides?: PortfolioSlide[] | null
}

export default function OurPortfolio({ data }: { data: OurPortfolioData | null }) {
  if (!data) return null

  const slides = (data.portfolioSlides || []).filter(Boolean) as PortfolioSlide[]

  const slideGroups = useMemo(() => {
    const groups: PortfolioSlide[][] = []
    for (let i = 0; i < slides.length; i += 4) {
      groups.push(slides.slice(i, i + 4))
    }
    return groups
  }, [slides])

  const [activeGroup, setActiveGroup] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (slideGroups.length <= 1) return

    intervalRef.current = setInterval(() => {
      setActiveGroup((prev) => (prev + 1) % slideGroups.length)
    }, 3500)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [slideGroups.length])

  if (!slideGroups.length) return null

  const currentSlides = slideGroups[activeGroup]

  return (
    <section className={styles.section} aria-label="Our Portfolio">
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>{data.sectionTitle}</h2>
          <p className={styles.description}>{data.sectionDescription}</p>

          {data.buttonLink && (
            <a href={data.buttonLink} className={styles.viewAll}>
              {data.buttonText || 'View All'} <span aria-hidden="true">→</span>
            </a>
          )}
        </div>

        <div className={styles.right}>
          <div className={styles.cardsGrid}>
            {currentSlides.map((slide, index) => (
              <a
                key={`${slide.founderName || 'portfolio'}-${index}`}
                href={slide.slideLink || '#'}
                className={styles.portfolioCard}
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles.cardImageWrap}>
                  {slide.founderImage?.node?.sourceUrl && (
                    <Image
                      src={slide.founderImage.node.sourceUrl}
                      alt={slide.founderImage.node.altText || slide.founderName || 'Founder'}
                      fill
                      className={styles.cardImage}
                      sizes="(min-width: 1200px) 260px, (min-width: 768px) 25vw, 90vw"
                    />
                  )}

                  <div className={styles.cardOverlay}>
                    <h3 className={styles.cardName}>{slide.founderName}</h3>
                    <p className={styles.cardRole}>{slide.founderRole}</p>
                  </div>
                </div>

                <div className={styles.cardLogoWrap}>
                  {slide.companyLogo?.node?.sourceUrl && (
                    <Image
                      src={slide.companyLogo.node.sourceUrl}
                      alt={slide.companyLogo.node.altText || 'Company logo'}
                      width={180}
                      height={70}
                      className={styles.cardLogo}
                    />
                  )}
                </div>
              </a>
            ))}
          </div>

          {slideGroups.length > 1 && (
            <div className={styles.dots}>
              {slideGroups.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.dot} ${index === activeGroup ? styles.dotActive : ''}`}
                  onClick={() => setActiveGroup(index)}
                  aria-label={`Go to portfolio slide group ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}