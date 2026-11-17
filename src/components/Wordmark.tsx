import Link from "next/link";

export function Wordmark({ tagline = false }: { tagline?: boolean }) {
  return (
    <Link href="/" className="wordmark" aria-label="Bakersfield Dirt home">
      <span className="wordmark__mark" aria-hidden="true"><i /><i /><i /></span>
      <span className="wordmark__text">
        <span className="wordmark__type">Bakersfield <strong>Dirt</strong></span>
        {tagline && <span className="wordmark__tagline" aria-hidden="true">Material supply &amp; trucking</span>}
      </span>
    </Link>
  );
}
