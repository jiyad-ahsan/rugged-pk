"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const tagColor = {
  planning: "text-rugged-500 dark:text-rugged-400",
  "food & water": "text-cyan-700 dark:text-cyan-400",
  gear: "text-amber-800 dark:text-amber-500",
  community: "text-emerald-700 dark:text-emerald-400",
  family: "text-violet-700 dark:text-violet-400",
  medical: "text-rose-700 dark:text-rose-400",
  comms: "text-amber-800 dark:text-amber-500",
  water: "text-cyan-700 dark:text-cyan-400",
  karachi: "text-teal-700 dark:text-teal-400",
  rotation: "text-sky-700 dark:text-sky-400",
};

const TAGS = ["all topics", "planning", "food & water", "gear", "community", "family", "medical", "comms"];

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return new Date(dateStr).toLocaleDateString("en-PK", { day: "numeric", month: "short" });
}

export default function ThreadList({ categories }) {
  const { data: session } = useSession();
  const [threads, setThreads] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState("all topics");
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [sort, setSort] = useState("activity");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchThreads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategoryId) params.set("categoryId", activeCategoryId);
    if (activeTag !== "all topics") params.set("tag", activeTag);
    if (sort) params.set("sort", sort);
    if (search) params.set("search", search);
    params.set("page", page.toString());

    const res = await fetch(`/api/forum/threads?${params}`);
    const data = await res.json();
    setThreads(data.threads || []);
    setTotal(data.total || 0);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  }, [activeCategoryId, activeTag, sort, search, page]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  return (
    <>
      {/* Category pills */}
      {categories.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => { setActiveCategoryId(null); setPage(1); }}
            className={`font-mono text-xs px-3 py-1.5 rounded-sm border cursor-pointer transition-all ${
              !activeCategoryId
                ? "bg-rugged-500 dark:bg-rugged-400 text-white border-rugged-500 dark:border-rugged-400"
                : "bg-transparent text-sand-600 dark:text-sand-500 border-black/15 dark:border-white/10 hover:border-black/30 dark:hover:border-white/20"
            }`}
          >
            all categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategoryId(cat.id); setPage(1); }}
              className={`font-mono text-xs px-3 py-1.5 rounded-sm border cursor-pointer transition-all ${
                activeCategoryId === cat.id
                  ? "bg-rugged-500 dark:bg-rugged-400 text-white border-rugged-500 dark:border-rugged-400"
                  : "bg-transparent text-sand-600 dark:text-sand-500 border-black/15 dark:border-white/10 hover:border-black/30 dark:hover:border-white/20"
              }`}
            >
              {cat.name.toLowerCase()}
            </button>
          ))}
        </div>
      )}

      {/* Tag filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => { setActiveTag(tag); setPage(1); }}
            className={`font-mono text-xs px-3 py-1.5 rounded-sm border cursor-pointer transition-all ${
              activeTag === tag
                ? "bg-rugged-500 dark:bg-rugged-400 text-white border-rugged-500 dark:border-rugged-400"
                : "bg-transparent text-sand-600 dark:text-sand-500 border-black/15 dark:border-white/10 hover:border-black/30 dark:hover:border-white/20"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Search + controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search threads..."
            className="flex-1 px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm
                       text-neutral-900 dark:text-sand-100 placeholder:text-sand-500
                       focus:outline-none focus:border-rugged-500 dark:focus:border-rugged-400"
          />
          <button type="submit" className="btn-outline text-sm px-4 py-2">
            Search
          </button>
        </form>

        <div className="flex gap-3 items-center">
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="font-mono text-xs px-3 py-2 bg-transparent border border-black/15 dark:border-white/10 rounded-sm
                       text-sand-600 dark:text-sand-500 cursor-pointer focus:outline-none"
          >
            <option value="activity">latest activity</option>
            <option value="newest">newest</option>
          </select>

          {session?.user && (
            <Link href="/forum/new" className="btn-primary text-sm px-4 py-2">
              + New thread
            </Link>
          )}
        </div>
      </div>

      {/* Thread list */}
      {loading ? (
        <div className="flex flex-col">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between items-center py-5 border-b border-black/10 dark:border-white/8 animate-pulse">
              <div className="flex-1">
                <div className="flex gap-4 mb-2">
                  <div className="h-3 w-16 bg-sand-300 dark:bg-sand-700 rounded-sm" />
                  <div className="h-3 w-24 bg-sand-300 dark:bg-sand-700 rounded-sm" />
                </div>
                <div className="h-5 w-3/4 bg-sand-300 dark:bg-sand-700 rounded-sm mb-2" />
                <div className="h-3 w-20 bg-sand-300 dark:bg-sand-700 rounded-sm" />
              </div>
              <div className="pl-6 text-center">
                <div className="h-7 w-8 bg-sand-300 dark:bg-sand-700 rounded-sm mx-auto mb-1" />
                <div className="h-2 w-10 bg-sand-300 dark:bg-sand-700 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      ) : threads.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sand-600 dark:text-sand-500 text-sm mb-4">
            {search ? "No threads match your search." : "No threads yet. Be the first to start a conversation."}
          </p>
          {session?.user && !search && (
            <Link href="/forum/new" className="btn-outline text-sm">
              Start a thread
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          {threads.map((t) => (
            <Link
              key={t.id}
              href={`/forum/thread/${t.id}`}
              className="flex justify-between items-center py-5 border-b border-black/10 dark:border-white/8
                         hover:bg-sand-100/50 dark:hover:bg-sand-800/30 -mx-4 px-4 transition-colors rounded-sm"
            >
              <div className="flex-1 min-w-0">
                <div className="flex gap-4 items-center text-xs mb-1.5 flex-wrap">
                  {t.tag && (
                    <span className={`font-medium uppercase tracking-wide ${tagColor[t.tag] || "text-rugged-500"}`}>
                      {t.tag}
                    </span>
                  )}
                  {t.category && (
                    <span className="text-sand-500 dark:text-sand-600">
                      {t.category.name}
                    </span>
                  )}
                  {t.isPinned && (
                    <span className="text-rugged-500/60 dark:text-rugged-400/60 font-medium">
                      pinned
                    </span>
                  )}
                  {t.isLocked && (
                    <span className="text-sand-500 font-medium">
                      locked
                    </span>
                  )}
                  <span className="text-sand-600 dark:text-sand-500">{timeAgo(t.lastActivityAt)}</span>
                </div>
                <h3 className="font-sans text-base font-medium leading-snug tracking-tight mb-1 text-neutral-900 dark:text-sand-100 truncate">
                  {t.title}
                </h3>
                <span className="text-xs text-sand-600 dark:text-sand-500">
                  by {t.author?.displayName || t.author?.name || "Anonymous"}
                </span>
              </div>
              <div className="text-center pl-6 shrink-0">
                <span className="font-sans text-2xl font-semibold block leading-none text-neutral-900 dark:text-sand-100">
                  {t.replyCount}
                </span>
                <span className="text-[0.65rem] text-sand-600 dark:text-sand-500 uppercase tracking-wider">
                  {t.replyCount === 1 ? "reply" : "replies"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn-outline text-sm px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-sand-600 dark:text-sand-500 self-center">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn-outline text-sm px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
