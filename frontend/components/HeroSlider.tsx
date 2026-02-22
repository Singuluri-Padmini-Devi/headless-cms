'use client'

import { useEffect, useState } from 'react'
import type { HeroSlide } from '@/types/hero'

const AUTO_ADVANCE_MS = 6000

interface HeroSliderProps {
  slides: HeroSlide[]
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!slides.length) return
    const interval = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % slides.length),
      AUTO_ADVANCE_MS,
    )
    return () => clearInterval(interval)
  }, [slides.length])

  useEffect(() => {
    setActiveIndex(0)
  }, [slides.length])

  if (!slides.length) {
    return null
  }

  const activeSlide = slides[activeIndex]

  return (
    <section id="HomeSlider" className="relative pt-20">
      <div className="relative h-[360px] sm:h-[460px] lg:h-[560px] overflow-hidden bg-[#0d3f66]">
        {/* Stack all desktop slides and crossfade via opacity – no gray flash on switch */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 bg-center bg-cover transition-opacity duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${slide.desktopImage})`,
              opacity: index === activeIndex ? 1 : 0,
              zIndex: index === activeIndex ? 1 : 0,
              pointerEvents: index === activeIndex ? 'auto' : 'none',
            }}
            aria-hidden={index !== activeIndex}
          />
        ))}
        <div className="absolute inset-0 bg-black/20 z-[2]" aria-hidden="true" />

        <div className="relative h-full z-10">
          <div className="container h-full">
            <div className="flex h-full items-center">
              <div className="w-full">
                <div className="max-w-xl bg-[#0d3f66]/90 text-white p-6 sm:p-8">
                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold leading-snug">
                    {activeSlide.headline}
                  </h2>
                </div>

                <div className="mt-6 sm:mt-8 flex justify-end">
                  <div className="text-right text-white drop-shadow">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                      {activeSlide.founderName || activeSlide.title}
                    </h1>
                    <p className="mt-1 text-sm sm:text-base lg:text-lg">
                      {activeSlide.founderTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="sm:hidden absolute inset-0 z-[3]">
          {slides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.mobileImage || slide.desktopImage}
              alt={slide.founderName || slide.title || 'Hero slide'}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                zIndex: index === activeIndex ? 1 : 0,
              }}
              loading="eager"
              fetchPriority={index === 0 ? 'high' : undefined}
            />
          ))}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-x-4 bottom-6 bg-[#0d3f66]/90 text-white p-4 z-10">
            <h2 className="text-base font-semibold leading-snug">
              {activeSlide.headline}
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
