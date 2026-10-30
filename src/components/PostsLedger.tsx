"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  isCategory,
  type Post,
  type PostCategory,
} from "@/content/posts";
import { SITE } from "@/content/site";
import { IconSearch } from "./icons";
import PostRow from "./PostRow";

const ALL = "all";
type Filter = typeof ALL | PostCategory;

type PostsLedgerProps = {
  posts: Post[];
  initialCategory?: string;
};

export default function PostsLedger({
  posts,
  initialCategory,
}: PostsLedgerProps) {
  const [category, setCategory] = useState<Filter>(
    isCategory(initialCategory) ? initialCategory : ALL
  );
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const next = { [ALL]: posts.length } as Record<Filter, number>;
    for (const key of CATEGORY_ORDER) {
      next[key] = posts.filter((post) => post.category === key).length;
    }
    return next;
  }, [posts]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (category !== ALL && post.category !== category) return false;
      if (!needle) return true;
      const haystack = [
        post.title,
        post.excerpt,
        post.ticker,
        CATEGORY_META[post.category].label,
        post.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [posts, category, query]);

  function choose(next: Filter) {
    setCategory(next);
    const base = window.location.pathname;
    const url = next === ALL ? base : `${base}?category=${next}`;
    window.history.replaceState(null, "", url);
  }

  function reset() {
    setQuery("");
    choose(ALL);
  }

  const activeLabel =
    category === ALL ? "Every desk" : CATEGORY_META[category].label;
  const activeBlurb =
    category === ALL
      ? "The complete SANGYAN record, newest first."
      : CATEGORY_META[category].blurb;

  return (
    <div className="ledger-layout">
      <aside className="filters" aria-label="Filter the archive">
        <div className="filter-block">
          <div className="filter-heading">
            <span>Desks</span>
            <span className="filter-heading-count">
              {String(posts.length).padStart(2, "0")}
            </span>
          </div>

          <div className="filter-list">
            <button
              type="button"
              className={`filter-btn ${category === ALL ? "is-active" : ""}`}
              onClick={() => choose(ALL)}
              aria-pressed={category === ALL}
            >
              <span>All posts</span>
              <span className="filter-count">{counts[ALL]}</span>
            </button>

            {CATEGORY_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                className={`filter-btn ${category === key ? "is-active" : ""}`}
                onClick={() => choose(key)}
                aria-pressed={category === key}
              >
                <span>{CATEGORY_META[key].label}</span>
                <span className="filter-count">{counts[key]}</span>
              </button>
            ))}
          </div>
        </div>

        <label className="filter-search">
          <span className="filter-heading">Search the record</span>
          <span className="search-box">
            <IconSearch />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Winner, press, jury…"
              aria-label="Search dispatches"
            />
          </span>
        </label>

        <button type="button" className="filter-reset" onClick={reset}>
          Reset the index <span aria-hidden="true">↺</span>
        </button>

        <p className="filter-note">
          Conducted by {SITE.organisation}
          <br />
          Supported {SITE.collaborators} at the offline event
        </p>
      </aside>

      <div className="ledger-main">
        <div className="ledger-status">
          <span>
            <strong>{String(filtered.length).padStart(2, "0")}</strong>{" "}
            {filtered.length === 1 ? "dispatch" : "dispatches"}
          </span>
          <span className="ledger-status-detail">
            {activeLabel} <span aria-hidden="true">/</span> {activeBlurb}
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="ledger-list">
            {filtered.map((post) => (
              <PostRow
                key={post.slug}
                post={post}
                number={posts.findIndex((item) => item.slug === post.slug) + 1}
              />
            ))}
          </div>
        ) : (
          <div className="ledger-empty">
            <span className="ledger-empty-code">0 / 0</span>
            <h3>Nothing on this desk yet.</h3>
            <p>
              No dispatch matches that filter. Try another desk or clear the
              search.
            </p>
            <button type="button" className="btn btn-line" onClick={reset}>
              <span>Reset the index</span>
              <span aria-hidden="true">↺</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
