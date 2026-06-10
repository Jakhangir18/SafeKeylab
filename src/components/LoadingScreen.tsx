import React from 'react';

interface Props {
  progress: number;
}

export function LoadingScreen({ progress }: Props) {
  const pct = Math.round(progress * 100);
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--color-bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '2rem',
    }}>
      <div style={{
        letterSpacing: '0.3em',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
      }}>
        SafeKey Lab
      </div>
      <div style={{
        width: 200,
        height: 1,
        background: 'var(--color-border)',
        borderRadius: 1,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: 'var(--color-accent)',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 8px var(--color-accent)',
        }} />
      </div>
      <div style={{
        fontVariantNumeric: 'tabular-nums',
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
      }}>
        {pct}%
      </div>
    </div>
  );
}
