import Link from 'next/link';
import './page.css';

/**
 * Home page component
 * @component
 * @returns {JSX.Element} Home page content
 */
export default function Home() {
  return (
    <div className="container">
      <h1>Avatar App</h1>
      <p>Choose your rendering method:</p>
      <div className="navigation">
        <Link href="/ssr" className="nav-link">
          Server-Side Rendering (SSR)
        </Link>
        <Link href="/ssg" className="nav-link">
          Static Site Generation (SSG)
        </Link>
      </div>
    </div>
  );
}
