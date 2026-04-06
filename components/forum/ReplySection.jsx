"use client";

import { useState, useEffect, useCallback } from "react";

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
}

function ReportButton({ type, id }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) return;
    const body = { reason };
    if (type === "thread") body.threadId = id;
    else body.replyId = id;

    await fetch("/api/forum/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSubmitted(true);
    setTimeout(() => { setOpen(false); setSubmitted(false); setReason(""); }, 2000);
  };

  if (submitted) return <span className="text-xs text-emerald-600">Reported</span>;

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-xs text-sand-500 hover:text-rose-500 transition-colors">
        Report
      </button>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason..."
        className="text-xs px-2 py-1 border border-black/15 dark:border-white/10 rounded-sm bg-transparent
                   text-neutral-900 dark:text-sand-100 w-40 focus:outline-none"
      />
      <button onClick={handleSubmit} className="text-xs text-rose-600 hover:text-rose-700">Submit</button>
      <button onClick={() => { setOpen(false); setReason(""); }} className="text-xs text-sand-500">Cancel</button>
    </div>
  );
}

export default function ReplySection({ threadId, isLocked, session, isMod }) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyBody, setReplyBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReplies = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/forum/threads/${threadId}/replies?page=${page}`);
    const data = await res.json();
    setReplies(data.replies || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  }, [threadId, page]);

  useEffect(() => {
    fetchReplies();
  }, [fetchReplies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!replyBody.trim() || submitting) return;
    setSubmitting(true);

    const res = await fetch(`/api/forum/threads/${threadId}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: replyBody }),
    });

    if (res.ok) {
      setReplyBody("");
      // Go to last page to see the new reply
      const data = await res.json();
      setReplies((prev) => [...prev, data]);
    }
    setSubmitting(false);
  };

  const handleHideReply = async (replyId, hide) => {
    await fetch(`/api/forum/replies/${replyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isHidden: hide, reason: "Moderator action" }),
    });
    fetchReplies();
  };

  return (
    <div className="mt-10">
      <h2 className="font-sans text-lg font-semibold mb-6 text-neutral-900 dark:text-sand-100">
        Replies
      </h2>

      {loading ? (
        <p className="text-sm text-sand-500">Loading replies...</p>
      ) : replies.length === 0 ? (
        <p className="text-sm text-sand-500 mb-8">No replies yet. Be the first to respond.</p>
      ) : (
        <div className="flex flex-col gap-0">
          {replies.map((r, i) => (
            <div
              key={r.id}
              className="py-5 border-b border-black/10 dark:border-white/8"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3 items-center text-xs">
                  <span className="font-medium text-neutral-900 dark:text-sand-100">
                    {r.author?.name || "Anonymous"}
                  </span>
                  <span className="text-sand-500">{timeAgo(r.createdAt)}</span>
                </div>
                <div className="flex gap-3 items-center">
                  {session?.user && <ReportButton type="reply" id={r.id} />}
                  {isMod && (
                    <button
                      onClick={() => handleHideReply(r.id, true)}
                      className="text-xs text-sand-500 hover:text-rose-500 transition-colors"
                    >
                      Hide
                    </button>
                  )}
                </div>
              </div>
              <div className="text-sm text-neutral-800 dark:text-sand-200 leading-relaxed whitespace-pre-wrap">
                {r.body}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn-outline text-xs px-3 py-1.5 disabled:opacity-30"
          >
            Previous
          </button>
          <span className="text-xs text-sand-500 self-center">{page} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn-outline text-xs px-3 py-1.5 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}

      {/* Reply form */}
      {session?.user && !isLocked ? (
        <form onSubmit={handleSubmit} className="mt-8">
          <textarea
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            placeholder="Write your reply..."
            rows={4}
            className="w-full px-4 py-3 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm
                       text-neutral-900 dark:text-sand-100 placeholder:text-sand-500
                       focus:outline-none focus:border-rugged-500 dark:focus:border-rugged-400 resize-y"
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!replyBody.trim() || submitting}
              className="btn-primary text-sm px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Posting..." : "Post reply"}
            </button>
          </div>
        </form>
      ) : isLocked ? (
        <p className="mt-8 text-sm text-sand-500 text-center py-4 border border-black/10 dark:border-white/8 rounded-sm">
          This thread is locked. No new replies can be posted.
        </p>
      ) : null}
    </div>
  );
}
