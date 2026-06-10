import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BEATS } from '../config/animationConfig';
import { ANIMATION_CONFIG } from '../config/animationConfig';

interface HeroContent {
  eyebrow: string;
  heading: string;
  sub: string;
  ctas: Array<{ label: string; primary: boolean }>;
}

interface TagContent {
  tag: string;
  tagColor: string;
  heading: string;
  sub: string;
  pills?: string[];
}

type BeatContent = HeroContent | TagContent;

const BEAT_CONTENT: Record<string, BeatContent> = {
  hero: {
    eyebrow: 'Cybersecurity for satellites',
    heading: 'Keep your satellites yours.',
    sub: 'One platform that tests your spacecraft, detects attacks as they happen, and gives you a clear record of what happened.',
    ctas: [
      { label: 'See the platform', primary: true },
      { label: 'Talk to us', primary: false },
    ],
  } as HeroContent,
  redteam: {
    tag: 'RED TEAM',
    tagColor: 'var(--color-accent-red)',
    heading: 'The space between offense and defense is where attackers actually live.',
    sub: 'Attack your own spacecraft — authorized, logged, reversible.',
  } as TagContent,
  blueteam: {
    tag: 'BLUE TEAM',
    tagColor: 'var(--color-accent-green)',
    heading: 'Detection that holds up when it matters.',
    sub: 'Real-time alerts and clear, defensible evidence at the moment of impact.',
  } as TagContent,
  platform: {
    tag: 'THE PLATFORM',
    tagColor: 'var(--color-accent)',
    heading: 'Attack · Detect · Score',
    sub: 'Mapped to the SPARTA space threat framework.',
    pills: ['Attack', 'Detect', 'Score'],
  } as TagContent,
};

export function BeatOverlay() {
  const { frameCount, scrollMultiplier } = ANIMATION_CONFIG;
  const sequenceHeight = frameCount * scrollMultiplier;

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0,
      width: '100%',
      height: sequenceHeight,
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      {BEATS.map(beat => {
        const topPx = beat.scrollProgress * sequenceHeight;
        const content = BEAT_CONTENT[beat.id];
        return (
          <BeatCard
            key={beat.id}
            topPx={topPx}
            beatId={beat.id}
            content={content}
          />
        );
      })}
    </div>
  );
}

interface BeatCardProps {
  topPx: number;
  beatId: string;
  content: BeatContent;
}

function BeatCard({ topPx, beatId, content }: BeatCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 40 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      end: 'bottom 25%',
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }),
      onLeave: () => gsap.to(el, { opacity: 0, y: -20, duration: 0.5 }),
      onEnterBack: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
      onLeaveBack: () => gsap.to(el, { opacity: 0, y: 40, duration: 0.5 }),
    });
    return () => st.kill();
  }, []);

  const isHero = beatId === 'hero';
  const heroContent = isHero ? (content as HeroContent) : null;
  const tagContent = !isHero ? (content as TagContent) : null;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: topPx,
        left: 0, right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: isHero ? 'center' : 'flex-start',
        padding: isHero ? '0 var(--space-lg)' : '0 var(--space-xl)',
        pointerEvents: 'auto',
      }}
    >
      <div
        className="glass glow-accent"
        style={{
          maxWidth: isHero ? 640 : 520,
          padding: 'var(--space-xl)',
          textAlign: isHero ? 'center' : 'left',
        }}
      >
        {isHero && heroContent ? (
          <>
            <div style={{
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-md)',
            }}>
              {heroContent.eyebrow}
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 'var(--space-md)',
            }}>
              {heroContent.heading}
            </h1>
            <p style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              marginBottom: 'var(--space-lg)',
            }}>
              {heroContent.sub}
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--space-md)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              {heroContent.ctas.map((cta) => (
                <button key={cta.label} style={{
                  padding: '0.75rem 1.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: cta.primary ? 'none' : '1px solid var(--color-border)',
                  background: cta.primary ? 'var(--color-accent)' : 'transparent',
                  color: cta.primary ? '#000' : 'var(--color-text-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  letterSpacing: '0.02em',
                }}>
                  {cta.label}
                </button>
              ))}
            </div>
          </>
        ) : tagContent ? (
          <>
            {tagContent.tag && (
              <div style={{
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: tagContent.tagColor,
                marginBottom: 'var(--space-sm)',
              }}>
                {tagContent.tag}
              </div>
            )}
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 'var(--space-md)',
            }}>
              {tagContent.heading}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              {tagContent.sub}
            </p>
            {tagContent.pills && (
              <div style={{
                display: 'flex',
                gap: 'var(--space-sm)',
                marginTop: 'var(--space-md)',
                flexWrap: 'wrap',
              }}>
                {tagContent.pills.map((p) => (
                  <span key={p} style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-accent)',
                    color: 'var(--color-accent)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                  }}>
                    {p}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
