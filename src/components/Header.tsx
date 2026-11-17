import { SiteNav } from "./SiteNav";
import { Wordmark } from "./Wordmark";

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner"><Wordmark tagline /><SiteNav /></div>
    </header>
  );
}
