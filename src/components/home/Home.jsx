// app/page.js
import HeroSection from './HeroSection';
import StoryIndex from '../stories/index';


export default function Home() {
  return (
    <main className='-24'>
      <StoryIndex />
      <HeroSection />
    </main>
  );
}