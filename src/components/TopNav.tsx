import { scenes } from '@/scenes.config';

export function TopNav() {
  return (
    <header className="top-nav">
      <a className="top-nav__brand" href="#hero">
        SafeKey Lab
      </a>
      <nav className="top-nav__links" aria-label="Primary">
        {scenes.map((scene) => (
          <a key={scene.id} href={`#${scene.id}`} className="top-nav__link">
            {scene.id.replace('-', ' ')}
          </a>
        ))}
      </nav>
    </header>
  );
}
