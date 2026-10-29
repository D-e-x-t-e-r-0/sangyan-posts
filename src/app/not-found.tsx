import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="page-shell scanlines noise-grain">
      <SiteHeader compact />

      <main className="not-found grid-overlay">
        <div className="not-found-inner">
          <span className="kicker">Error / 404 / Missing dispatch</span>
          <div className="not-found-code" aria-hidden="true">
            404
          </div>
          <h1 className="not-found-title">
            This page is not <em>on the record.</em>
          </h1>
          <p className="not-found-copy">
            The dispatch you asked for is not in the archive. It may have moved,
            or the link may be incomplete.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="btn btn-solid">
              <span>Back to SANGYAN Posts</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/#archive" className="btn btn-line">
              <span>Browse the archive</span>
              <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
