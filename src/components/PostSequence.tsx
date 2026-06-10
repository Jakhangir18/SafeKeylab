import React, { useRef, useEffect } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useReveal();
  return (
    <section id={id} style={{ padding: 'var(--space-2xl) var(--space-xl)', maxWidth: 1200, margin: '0 auto' }}>
      <div
        ref={ref}
        className="glass"
        style={{
          padding: 'var(--space-xl)',
          opacity: 0,
          transform: 'translateY(40px)',
          transition: 'opacity 0.8s var(--transition-smooth), transform 0.8s var(--transition-smooth)',
        }}
      >
        {children}
      </div>
    </section>
  );
}

export function PostSequence({ lastFrame }: { lastFrame: HTMLImageElement | null }) {
  const bgRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = bgRef.current;
    if (!canvas || !lastFrame) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const scale = Math.max(canvas.width / lastFrame.naturalWidth, canvas.height / lastFrame.naturalHeight);
    const sw = lastFrame.naturalWidth * scale;
    const sh = lastFrame.naturalHeight * scale;
    ctx.drawImage(lastFrame, (canvas.width - sw) / 2, (canvas.height - sh) / 2, sw, sh);
  }, [lastFrame]);

  return (
    <div style={{ position: 'relative', background: 'var(--color-bg)' }}>
      {/* Fixed last-frame backdrop */}
      <canvas
        ref={bgRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: -1,
          opacity: 0.2,
        }}
      />

      <Section id="sectors">
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', marginBottom: 'var(--space-lg)' }}>Sectors</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
          {['Government Space Programs', 'Constellation Operators', 'Satellite Manufacturers'].map(s => (
            <div key={s} className="glass" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>🛰</div>
              <div style={{ fontWeight: 600 }}>{s}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="field-validation">
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', marginBottom: 'var(--space-lg)' }}>Track Record</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-md)' }}>
          {[
            { val: 'TRL 4', label: 'Space product vs real satellite RF' },
            { val: 'TRL 7', label: 'Ground architecture, military exercise' },
            { val: '34,628', label: 'Detections in 24 hours' },
            { val: '3', label: 'Field exercises with a U.S. Army unit' },
          ].map(({ val, label }) => (
            <div key={val} className="glass" style={{ padding: 'var(--space-lg)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: 'var(--space-xs)' }}>{val}</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{label}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>Colorado Springs ground station</p>
      </Section>

      <Section id="posture">
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', marginBottom: 'var(--space-lg)' }}>Posture & Compliance</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
          {[
            'USML Cat XI scope',
            'Section 889 review underway',
            'MIL-STD-810H & 461G pathways',
            'CMMC L2 self-assessed',
            'Patents pending',
          ].map(item => (
            <div key={item} className="glass" style={{ padding: 'var(--space-md) var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="company">
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', marginBottom: 'var(--space-lg)' }}>Company</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-lg)' }}>
          {[
            { name: 'Sukin Yang', role: 'Founder & CEO' },
            { name: 'Chance LeBlanc', role: 'Military Integration' },
          ].map(({ name, role }) => (
            <div key={name} className="glass" style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                margin: '0 auto var(--space-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem',
              }}>
                {name[0]}
              </div>
              <div style={{ fontWeight: 700, marginBottom: 'var(--space-xs)' }}>{name}</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', letterSpacing: '0.05em' }}>{role}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', marginBottom: 'var(--space-md)' }}>
            Let's talk about your spacecraft.
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
            Whether you're operating satellites today or launching next year, we'll show you exactly where you're exposed.
          </p>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}
            onSubmit={e => e.preventDefault()}
          >
            {['Your name', 'Organization', 'Email address'].map(placeholder => (
              <input
                key={placeholder}
                placeholder={placeholder}
                style={{
                  padding: '0.875rem 1rem',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            ))}
            <button type="submit" style={{
              padding: '0.875rem',
              background: 'var(--color-accent)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}>
              Request a briefing
            </button>
          </form>
        </div>
      </Section>

      <footer style={{
        padding: 'var(--space-xl)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: 'var(--color-text-muted)', fontSize: '0.8rem',
        flexWrap: 'wrap', gap: 'var(--space-md)',
      }}>
        <span>SafeKey Lab © 2025</span>
        <span>Cybersecurity for satellites</span>
      </footer>
    </div>
  );
}
