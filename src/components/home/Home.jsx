// app/page.js
import StoriesGrid from '../story/StoriesGrid';
import Header from '../header/Header';
import HeroSection from './HeroSection';


export default function Home() {
  return (
    <main>
      <StoriesGrid />
      <HeroSection />
      <Header />
    </main>
  );
}