import { scenes } from '@/scenes.config';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { Scene } from '@/components/Scene';
import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';

export function App() {
  useLenisScroll();

  return (
    <div className="app-shell">
      <TopNav />
      <main className="page-shell">
        {scenes.map((scene) => (
          <Scene key={scene.id} scene={scene} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
