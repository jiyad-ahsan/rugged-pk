"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TAGS = ["planning", "food & water", "gear", "community", "family", "medical", "comms", "water", "karachi"];

export default function NewThreadForm({ categories }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [tag, setTag] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !categoryId) {
      setError("Title, body, and category are required.");
      return;
    }
    setError("");
    setSubmitting(true);

    const res = await fetch("/api/forum/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, categoryId, tag: tag || null }),
    });

    if (res.ok) {
      const thread = await res.json();
      router.push(`/forum/thread/${thread.id}`);
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-sm text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 rounded-sm border border-rose-200 dark:border-rose-800">
          {error}
        </div>
      )}

      {/* Category */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-sand-600 dark:text-sand-500 mb-2">
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full px-4 py-3 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm
                     text-neutral-900 dark:text-sand-100 focus:outline-none focus:border-rugged-500 dark:focus:border-rugged-400"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-sand-600 dark:text-sand-500 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          maxLength={200}
          className="w-full px-4 py-3 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm
                     text-neutral-900 dark:text-sand-100 placeholder:text-sand-500
                     focus:outline-none focus:border-rugged-500 dark:focus:border-rugged-400"
        />
        <span className="text-xs text-sand-500 mt-1 block text-right">{title.length}/200</span>
      </div>

      {/* Tag */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-sand-600 dark:text-sand-500 mb-2">
          Tag (optional)
        </label>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setTag("")}
            className={`font-mono text-xs px-3 py-1.5 rounded-sm border cursor-pointer transition-all ${
              !tag
                ? "bg-rugged-500 dark:bg-rugged-400 text-white border-rugged-500 dark:border-rugged-400"
                : "bg-transparent text-sand-600 dark:text-sand-500 border-black/15 dark:border-white/10 hover:border-black/30"
            }`}
          >
            none
          </button>
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={`font-mono text-xs px-3 py-1.5 rounded-sm border cursor-pointer transition-all ${
                tag === t
                  ? "bg-rugged-500 dark:bg-rugged-400 text-white border-rugged-500 dark:border-rugged-400"
                  : "bg-transparent text-sand-600 dark:text-sand-500 border-black/15 dark:border-white/10 hover:border-black/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-sand-600 dark:text-sand-500 mb-2">
          Body
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your experience, question, or insight..."
          rows={10}
          className="w-full px-4 py-3 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm
                     text-neutral-900 dark:text-sand-100 placeholder:text-sand-500
                     focus:outline-none focus:border-rugged-500 dark:focus:border-rugged-400 resize-y"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-outline text-sm px-6 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || !title.trim() || !body.trim()}
          className="btn-primary text-sm px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Posting..." : "Post thread"}
        </button>
      </div>
    </form>
  );
}
