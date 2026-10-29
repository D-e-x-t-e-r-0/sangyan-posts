import Link from "next/link";
import {
  CATEGORY_META,
  formatDate,
  getReadTime,
  type Post,
} from "@/content/posts";
import Cover from "./Cover";

type PostRowProps = {
  post: Post;
  number: number;
  compact?: boolean;
};

export default function PostRow({ post, number, compact = false }: PostRowProps) {
  const meta = CATEGORY_META[post.category];

  return (
    <article className={`ledger-row ${compact ? "is-compact" : ""}`}>
      <Link href={`/posts/${post.slug}`} className="ledger-row-link">
        <div className="ledger-thumb">
          <Cover src={post.cover} alt={post.coverAlt} />
        </div>

        <div className="ledger-body">
          <div className="ledger-meta">
            <span className="cat-tag" style={{ color: meta.color }}>
              {meta.label}
            </span>
            <span>{formatDate(post.date)}</span>
            <span className="meta-dot" aria-hidden="true" />
            <span>{getReadTime(post)} min read</span>
          </div>

          <h3 className="ledger-title">{post.title}</h3>
          <p className="ledger-excerpt">{post.excerpt}</p>

          <div className="ledger-foot">
            <div className="ledger-tags">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <span className="ledger-read">
              Read dispatch <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>

        <div className="ledger-side" aria-hidden="true">
          <span className="ledger-num">{String(number).padStart(2, "0")}</span>
          <span className="ledger-arrow">↗</span>
        </div>
      </Link>
    </article>
  );
}
