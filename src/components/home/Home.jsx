// app/page.js
import StoriesGrid from '../story/StoriesGrid';
import Header from '../header/Header';


export default function Home() {
  return (
    <main>
      <StoriesGrid />
      <Header />
    </main>
  );
}