import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORY_META,
  formatDate,
  getPost,
  getPosts,
  getReadTime,
  getRelatedPosts,
  type PostBlock,
} from "@/content/posts";
import { SITE } from "@/content/site";
import Cover from "@/components/Cover";
import PostRow from "@/components/PostRow";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return { title: "Dispatch not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.cover, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

function ArticleBlock({ block }: { block: PostBlock }) {
  if (block.type === "h2") return <h2>{block.text}</h2>;
  if (block.type === "quote") return <blockquote>{block.text}</blockquote>;
  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p>{block.text}</p>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const meta = CATEGORY_META[post.category];
  const related = getRelatedPosts(post);
  const readTime = getReadTime(post);

  return (
    <div className="page-shell scanlines noise-grain">
      <SiteHeader compact activeCategory={post.category} />

      <main className="story">
        <article>
          <header className="story-head">
            <Link href="/#archive" className="story-back">
              <span aria-hidden="true">←</span> All posts
            </Link>

            <div className="story-kicker">
              <span className="cat-tag" style={{ color: meta.color }}>
                {meta.label}
              </span>
              <span>{formatDate(post.date)}</span>
              <span className="meta-dot" aria-hidden="true" />
              <span>{readTime} min read</span>
              <span className="meta-dot" aria-hidden="true" />
              <span>Dispatch / {meta.code}</span>
            </div>

            <h1 className="story-title">{post.title}</h1>
            <p className="story-deck">{post.excerpt}</p>

            <div className="story-byline">
              <div className="byline-cell">
                <span className="byline-key">Words</span>
                <span className="byline-val">{post.author}</span>
              </div>
              <div className="byline-cell">
                <span className="byline-key">Desk</span>
                <span className="byline-val">{meta.label}</span>
              </div>
              <div className="byline-cell">
                <span className="byline-key">Published</span>
                <span className="byline-val">{formatDate(post.date)}</span>
              </div>
              <div className="byline-cell byline-cell-end">
                <span className="byline-key">Record</span>
                <span className="byline-val">SANGYAN {SITE.year}</span>
              </div>
            </div>
          </header>

          <figure className="story-cover">
            <Cover src={post.hero ?? post.cover} alt={post.coverAlt} />
            <figcaption>
              <span>{post.coverAlt}</span>
              <span>SANGYAN {SITE.year} / {meta.label}</span>
            </figcaption>
          </figure>

          <div className="story-layout">
            <aside className="story-rail" aria-label="Dispatch details">
              <div className="rail-block">
                <span className="rail-key">Published</span>
                <span className="rail-val">{formatDate(post.date)}</span>
              </div>
              <div className="rail-block">
                <span className="rail-key">Author</span>
                <span className="rail-val">{post.author}</span>
              </div>
              <div className="rail-block">
                <span className="rail-key">Desk</span>
                <span className="rail-val">{meta.label}</span>
              </div>
              <div className="rail-block">
                <span className="rail-key">Reading time</span>
                <span className="rail-val">{readTime} minutes</span>
              </div>

              <div className="rail-tags">
                <span className="rail-key">Filed under</span>
                <div className="tag-row">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link href={`/?category=${post.category}#archive`} className="rail-link">
                More from {meta.label} <span aria-hidden="true">↗</span>
              </Link>
            </aside>

            <div className="story-body">
              {post.body.map((block, index) => (
                <ArticleBlock key={`${block.type}-${index}`} block={block} />
              ))}

              <div className="story-end">
                <span className="story-end-mark" aria-hidden="true">
                  ◆
                </span>
                <span>
                  {post.author} · {formatDate(post.date)} · SANGYAN {SITE.year}
                </span>
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="related" id="related">
            <div className="related-head">
              <div>
                <span className="kicker">Continue the record</span>
                <h2 className="related-title">
                  More <em>dispatches.</em>
                </h2>
              </div>
              <Link href="/#archive" className="btn btn-line">
                <span>The full archive</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="ledger-list ledger-list-related">
              {related.map((item, index) => (
                <PostRow
                  key={item.slug}
                  post={item}
                  number={index + 1}
                  compact
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
