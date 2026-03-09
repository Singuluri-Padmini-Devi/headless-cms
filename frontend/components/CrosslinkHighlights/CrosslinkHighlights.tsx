import Image from 'next/image'
import styles from './CrosslinkHighlights.module.css'

type HighlightItem = {
  highlightTitle?: string | null
  highlightDescription?: string | null
  icon?: { node?: { sourceUrl?: string | null; altText?: string | null } | null } | null
}

type TeamImages = {
  edges?: { node?: { sourceUrl?: string | null; altText?: string | null } | null }[] | null
} | null

type CrosslinkHighlightsData = {
  highlightsTitle?: string | null
  highlights?: HighlightItem[] | null
  teamImages?: TeamImages
  teamButtonText?: string | null
  teamButtonLink?: string | null
}

export default function CrosslinkHighlights({ data }: { data: CrosslinkHighlightsData | null }) {
  if (!data) return null

  const title = data.highlightsTitle || 'Crosslink Highlights'
  const highlights = (data.highlights || []).filter(Boolean) as HighlightItem[]

  // 3 items top row + 3 items bottom row
  const topRow = highlights.slice(0, 3)
  const bottomRow = highlights.slice(3, 6)

  const teamImages =
    data?.teamImages?.edges
      ?.map((e) => e?.node?.sourceUrl)
      .filter((u): u is string => Boolean(u)) ?? []

  const btnText = data.teamButtonText || 'VIEW OUR TEAM'
  const btnLink = data.teamButtonLink || '/team'

  return (
    <section className={styles.section} aria-label="Crosslink Highlights">
      <div className={styles.container}>
        <h2 className={styles.heading}>
          {(() => {
            // Make only the last word bold like "Crosslink Highlights"
            const parts = title.trim().split(' ')
            if (parts.length <= 1) return <span className={styles.headingBold}>{title}</span>
            const last = parts.pop()
            return (
              <>
                {parts.join(' ')} <span className={styles.headingBold}>{last}</span>
              </>
            )
          })()}
        </h2>

        <div className={styles.layout}>
          {/* Left: Highlights grid */}
          <div className={styles.highlightsGrid}>
            <div className={styles.row}>
              {topRow.map((item, idx) => (
                <div key={`${item.highlightTitle || 'item'}-${idx}`} className={styles.card}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    {item.icon?.node?.sourceUrl ? (
                      <Image
                        src={item.icon.node.sourceUrl}
                        alt={item.icon.node.altText || ''}
                        fill
                        className={styles.iconImg}
                        sizes="60px"
                      />
                    ) : null}
                  </div>

                  {item.highlightTitle ? (
                    <div className={styles.cardTitle}>{item.highlightTitle}</div>
                  ) : null}

                  {item.highlightDescription ? (
                    <div className={styles.cardDesc}>{item.highlightDescription}</div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className={styles.row}>
              {bottomRow.map((item, idx) => (
                <div key={`${item.highlightTitle || 'item'}-${idx}`} className={styles.card}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    {item.icon?.node?.sourceUrl ? (
                      <Image
                        src={item.icon.node.sourceUrl}
                        alt={item.icon.node.altText || ''}
                        fill
                        className={styles.iconImg}
                        sizes="60px"
                      />
                    ) : null}
                  </div>

                  {item.highlightTitle ? (
                    <div className={styles.cardTitle}>{item.highlightTitle}</div>
                  ) : null}

                  {item.highlightDescription ? (
                    <div className={styles.cardDesc}>{item.highlightDescription}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Team collage */}
          <div className={styles.teamArea}>
            <div className={styles.collage}>
              {/* Big image */}
              {teamImages[0] ? (
                <div className={`${styles.tile} ${styles.big}`}>
                  <Image
                    src={teamImages[0]}
                    alt="Team member"
                    fill
                    className={styles.photo}
                    sizes="(min-width: 1024px) 360px, 60vw"
                    priority={false}
                  />
                </div>
              ) : (
                <div className={`${styles.tile} ${styles.big} ${styles.placeholder}`} />
              )}

              {/* Small tiles (up to 5 more) */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`${styles.tile} ${styles['s' + i]}`}>
                  {teamImages[i] ? (
                    <Image
                      src={teamImages[i]}
                      alt="Team member"
                      fill
                      className={styles.photo}
                      sizes="180px"
                      priority={false}
                    />
                  ) : (
                    <div className={`${styles.placeholder} ${styles.placeholderInner}`} />
                  )}
                </div>
              ))}
            </div>

            <a href={btnLink} className={styles.teamLink}>
              {btnText} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}