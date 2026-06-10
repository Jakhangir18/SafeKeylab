import React from 'react';

const links = ['Platform', 'Sectors', 'Posture', 'Field Validation', 'Company'];

export function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.25rem var(--space-xl)',
      background: 'rgba(5,8,16,0.7)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div style={{
        fontWeight: 700,
        letterSpacing: '0.15em',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        color: 'var(--color-text-primary)',
      }}>
        SafeKey Lab
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
        {links.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase().replace(' ', '-')}`}
            style={{
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
              transition: 'color 0.2s',
            }}
          >
            {l}
          </a>
        ))}
        <a
          href="#contact"
          style={{
            padding: '0.5rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-accent)',
            color: '#000',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.875rem',
          }}
        >
          Talk to us
        </a>
      </div>
    </nav>
  );
}
