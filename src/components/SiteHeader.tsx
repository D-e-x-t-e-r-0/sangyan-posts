import Link from "next/link";
import { formatDate, getPosts } from "@/content/posts";
import { NAV_LINKS, SITE } from "@/content/site";
import { IconArrowUpRight } from "./icons";

type SiteHeaderProps = {
  compact?: boolean;
  activeCategory?: string;
};

export default function SiteHeader({
  compact = false,
  activeCategory,
}: SiteHeaderProps) {
  const posts = getPosts();
  const wire = posts.slice(0, 4);
  const doubled = [...wire, ...wire];
  const latestDate = posts[0] ? formatDate(posts[0].date) : SITE.edition;

  return (
    <>
      <div className="topwire">
        <Link href="/" className="topwire-brand">
          {SITE.brand} <span>{SITE.section}</span>
        </Link>

        <div className="topwire-ticker" aria-label="Latest posts">
          <div className="topwire-track">
            {doubled.map((post, index) => (
              <Link
                key={`${post.slug}-${index}`}
                href={`/posts/${post.slug}`}
                className="topwire-item"
                tabIndex={index >= wire.length ? -1 : undefined}
                aria-hidden={index >= wire.length ? true : undefined}
              >
                <span className="topwire-bullet" aria-hidden="true">
                  ◆
                </span>
                {post.title}
              </Link>
            ))}
          </div>
        </div>

        <span className="topwire-date">
          {SITE.edition} <span aria-hidden="true">/</span> {latestDate}
        </span>
      </div>

      <header className={`site-head ${compact ? "is-compact" : ""}`}>
        <div className="masthead">
          <div className="masthead-meta">
            <span>{SITE.volume}</span>
            <span>
              {String(posts.length).padStart(2, "0")} dispatches on record
            </span>
            <span>{SITE.place}</span>
          </div>

          <Link href="/" className="masthead-mark" aria-label={`${SITE.fullName} home`}>
            <span className="masthead-word">{SITE.brand}</span>
            <span className="masthead-stamp">{SITE.section}</span>
          </Link>

          <div className="masthead-side">
            <span className="masthead-side-label">The hackathon archive</span>
            <a
              href={SITE.hackathonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="masthead-side-link"
            >
              sangyan.copsiitbhu.co.in
              <IconArrowUpRight size={11} />
            </a>
            <span className="masthead-side-credit">
              with {SITE.collaborators}
            </span>
          </div>
        </div>

        <div className="indexbar">
          <span className="indexbar-label">Index</span>
          <nav className="indexbar-nav" aria-label="Post categories">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? !activeCategory
                  : !!activeCategory &&
                    link.href.includes(`category=${activeCategory}`);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`indexbar-link ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link href="/#archive" className="indexbar-jump">
            Browse the archive <span aria-hidden="true">↓</span>
          </Link>
        </div>
      </header>
    </>
  );
}
