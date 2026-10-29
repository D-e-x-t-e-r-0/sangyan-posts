import Link from "next/link";
import {
  CATEGORY_META,
  formatDate,
  getFeaturedPost,
  getPosts,
  getReadTime,
  isCategory,
} from "@/content/posts";
import { SITE } from "@/content/site";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";
import PostsLedger from "@/components/PostsLedger";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { IconArrowUpRight } from "@/components/icons";

type HomePageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const { category } = await searchParams;
  const posts = getPosts();
  const featured = getFeaturedPost();
  const latest = posts[0];
  const initialCategory =
    typeof category === "string" && isCategory(category) ? category : undefined;

  const ordered = [
    featured,
    ...posts.filter((post) => post.slug !== featured.slug),
  ];

  const slides: HeroSlide[] = ordered.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: CATEGORY_META[post.category].label,
    date: formatDate(post.date),
    cover: post.hero ?? post.cover,
    coverAlt: post.coverAlt,
    readTime: getReadTime(post),
  }));

  const wire = posts.slice(0, 3);

  return (
    <div className="page-shell scanlines noise-grain">
      <h1 className="sr-only">
        SANGYAN Posts — winners, media, announcements and stories from SANGYAN
        2026
      </h1>

      <SiteHeader activeCategory={initialCategory} />

      <main>
        <section className="lead" id="top">
          <div className="lead-intro">
            <div className="lead-kicker">
              <span className="kicker">SANGYAN {SITE.year}</span>
              <span className="kicker-rule" />
              <span className="kicker">The posts archive</span>
            </div>
            <p className="lead-deck">
              The official record of what was built, who built it, and what
              happens next — compiled by SANGYAN Posts at IIT (BHU) Varanasi.
            </p>
            <span className="lead-edition">
              {String(posts.length).padStart(2, "0")} dispatches · last updated{" "}
              {formatDate(latest.date)}
            </span>
          </div>

          <HeroSlider slides={slides} />
        </section>

        <section className="record-strip" aria-label="SANGYAN 2026 at a glance">
          <div className="record-cell">
            <span className="record-index">01</span>
            <span className="record-value">01—07 OCT</span>
            <span className="record-label">Build sprint · {SITE.year}</span>
          </div>
          <div className="record-cell">
            <span className="record-index">02</span>
            <span className="record-value">06</span>
            <span className="record-label">Focus tracks · one open</span>
          </div>
          <div className="record-cell">
            <span className="record-index">03</span>
            <span className="record-value">₹1.7L</span>
            <span className="record-label">Prize pool · top three</span>
          </div>
          <div className="record-cell">
            <span className="record-index">04</span>
            <span className="record-value">IIT (BHU)</span>
            <span className="record-label">Varanasi · in collaboration</span>
          </div>
        </section>

        <section className="wire" aria-labelledby="wire-heading">
          <div className="wire-head">
            <div>
              <span className="kicker">Latest on the wire</span>
              <h2 id="wire-heading" className="wire-title">
                Fresh from the desks
              </h2>
            </div>
            <span className="wire-updated">
              Updated {formatDate(latest.date)} · {SITE.place}
            </span>
          </div>

          <div className="wire-grid">
            {wire.map((post, index) => {
              const meta = CATEGORY_META[post.category];
              return (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="wire-item"
                >
                  <span className="wire-item-top">
                    <span className="wire-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="cat-tag" style={{ color: meta.color }}>
                      {meta.label}
                    </span>
                    <span className="wire-date">{formatDate(post.date)}</span>
                  </span>
                  <span className="wire-item-title">{post.title}</span>
                  <span className="wire-item-excerpt">{post.excerpt}</span>
                  <span className="wire-item-foot">
                    {getReadTime(post)} min read
                    <span className="wire-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="archive" id="archive">
          <div className="archive-head">
            <div className="archive-heading">
              <span className="kicker">01 / The full record</span>
              <h2 className="archive-title">
                Every <em>dispatch.</em>
              </h2>
            </div>
            <p className="archive-deck">
              Winners, press, official notices, and longer stories — arranged in
              one ledger. Filter by desk or search the record. New posts appear
              at the top.
            </p>
          </div>

          <PostsLedger
            key={initialCategory ?? "all"}
            posts={posts}
            initialCategory={initialCategory}
          />
        </section>

        <section className="afterword">
          <div className="afterword-glow" aria-hidden="true" />
          <div className="afterword-inner">
            <span className="afterword-kicker">
              SANGYAN {SITE.year} / Colophon
            </span>
            <p className="afterword-quote">
              “The sprint ended. The record is still being written.”
            </p>
            <div className="afterword-foot">
              <p>
                SANGYAN is organised by {SITE.organisation}, in collaboration
                with {SITE.collaborators}. This archive is maintained by the
                SANGYAN media team.
              </p>
              <a
                href={SITE.hackathonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line afterword-link"
              >
                <span>Visit the hackathon</span>
                <IconArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
