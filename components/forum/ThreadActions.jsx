"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ThreadActions({ threadId, isPinned, isLocked, session, isMod, isAuthor }) {
  const router = useRouter();
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reported, setReported] = useState(false);

  const handleReport = async () => {
    if (!reportReason.trim()) return;
    await fetch("/api/forum/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason: reportReason, threadId }),
    });
    setReported(true);
    setTimeout(() => { setReportOpen(false); setReported(false); setReportReason(""); }, 2000);
  };

  const handleModAction = async (data) => {
    await fetch(`/api/forum/threads/${threadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.refresh();
  };

  return (
    <div className="flex gap-4 items-center py-4 flex-wrap">
      {/* Report */}
      {session?.user && !isAuthor && (
        <>
          {reported ? (
            <span className="text-xs text-emerald-600">Reported</span>
          ) : reportOpen ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Reason for report..."
                className="text-xs px-2 py-1 border border-black/15 dark:border-white/10 rounded-sm bg-transparent
                           text-neutral-900 dark:text-sand-100 w-48 focus:outline-none"
              />
              <button onClick={handleReport} className="text-xs text-rose-600 hover:text-rose-700">Submit</button>
              <button onClick={() => { setReportOpen(false); setReportReason(""); }} className="text-xs text-sand-500">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setReportOpen(true)} className="text-xs text-sand-500 hover:text-rose-500 transition-colors">
              Report thread
            </button>
          )}
        </>
      )}

      {/* Mod controls */}
      {isMod && (
        <>
          <button
            onClick={() => handleModAction({ isPinned: !isPinned })}
            className="text-xs text-sand-500 hover:text-rugged-500 transition-colors"
          >
            {isPinned ? "Unpin" : "Pin"}
          </button>
          <button
            onClick={() => handleModAction({ isLocked: !isLocked })}
            className="text-xs text-sand-500 hover:text-amber-600 transition-colors"
          >
            {isLocked ? "Unlock" : "Lock"}
          </button>
          <button
            onClick={() => handleModAction({ isHidden: true, reason: "Moderator action" })}
            className="text-xs text-sand-500 hover:text-rose-500 transition-colors"
          >
            Hide thread
          </button>
        </>
      )}
    </div>
  );
}
