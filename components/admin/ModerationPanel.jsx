"use client";

import { useState, useEffect, useCallback } from "react";

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const statusColors = {
  open: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20",
  resolved: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",
  dismissed: "text-sand-500 bg-sand-200 dark:bg-sand-700",
};

export default function ModerationPanel() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("open");
  const [actioning, setActioning] = useState(null);
  const [actions, setActions] = useState([]);
  const [showActions, setShowActions] = useState(false);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/forum/mod?status=${statusFilter}`);
    const data = await res.json();
    setReports(data);
    setLoading(false);
  }, [statusFilter]);

  const fetchActions = useCallback(async () => {
    const res = await fetch("/api/admin/moderation/actions");
    if (res.ok) {
      const data = await res.json();
      setActions(data);
    }
  }, []);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  const handleResolve = async (reportId, status) => {
    setActioning(reportId);
    const res = await fetch("/api/forum/mod", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId, status }),
    });

    if (res.ok) {
      fetchReports();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to update report");
    }
    setActioning(null);
  };

  const toggleActions = () => {
    if (!showActions) fetchActions();
    setShowActions(!showActions);
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight mb-1">Moderation</h1>
          <p className="text-sm text-sand-500">Review reports and manage forum content.</p>
        </div>
        <button
          onClick={toggleActions}
          className="btn-outline text-xs px-3 py-1.5"
        >
          {showActions ? "Hide" : "Show"} Audit Log
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-6">
        {["open", "resolved", "dismissed"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`font-mono text-xs px-3 py-1.5 rounded-sm cursor-pointer transition-all capitalize
              ${statusFilter === status
                ? "bg-neutral-900 dark:bg-sand-100 text-white dark:text-sand-900"
                : "bg-transparent text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
              }`}
            style={statusFilter !== status ? { border: "1px solid rgba(128,128,128,0.2)" } : { border: "1px solid transparent" }}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-sand-500">Loading reports...</p>
      ) : reports.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-sm text-sand-600 dark:text-sand-500 mb-1">
            {statusFilter === "open" ? "No open reports. All clear." : `No ${statusFilter} reports.`}
          </p>
          {statusFilter === "open" && (
            <span className="text-2xl">✓</span>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="card p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[0.6rem] uppercase tracking-widest font-medium px-1.5 py-0.5 rounded-sm ${statusColors[report.status]}`}>
                      {report.status}
                    </span>
                    <span className="text-xs text-sand-500 tabular-nums">{timeAgo(report.createdAt)}</span>
                  </div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-sand-100">
                    {report.reason}
                  </p>
                  {report.notes && (
                    <p className="text-xs text-sand-500 mt-1">{report.notes}</p>
                  )}
                </div>

                {report.status === "open" && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleResolve(report.id, "resolved")}
                      disabled={actioning === report.id}
                      className="text-xs text-emerald-600 hover:text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-sm disabled:opacity-50"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => handleResolve(report.id, "dismissed")}
                      disabled={actioning === report.id}
                      className="text-xs text-sand-500 hover:text-sand-700 bg-sand-100 dark:bg-sand-800 px-3 py-1.5 rounded-sm disabled:opacity-50"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>

              {/* Reported content */}
              <div className="bg-sand-50 dark:bg-sand-900 rounded-sm p-4 text-sm"
                style={{ border: "1px solid rgba(128,128,128,0.08)" }}
              >
                {report.thread && (
                  <div>
                    <span className="text-[0.6rem] font-mono uppercase tracking-wider text-sand-500 block mb-1">
                      Thread
                    </span>
                    <a
                      href={`/forum/thread/${report.thread.id}`}
                      className="text-sm font-medium text-rugged-500 hover:text-rugged-600"
                      target="_blank"
                      rel="noopener"
                    >
                      {report.thread.title}
                    </a>
                    <span className="text-xs text-sand-500 ml-2">
                      by {report.thread.author?.name || "Unknown"}
                    </span>
                  </div>
                )}
                {report.reply && (
                  <div>
                    <span className="text-[0.6rem] font-mono uppercase tracking-wider text-sand-500 block mb-1">
                      Reply in thread
                    </span>
                    <p className="text-sm text-neutral-900 dark:text-sand-100 line-clamp-3">
                      {report.reply.body}
                    </p>
                    <span className="text-xs text-sand-500 mt-1 block">
                      by {report.reply.author?.name || "Unknown"}
                    </span>
                  </div>
                )}
              </div>

              {/* Reporter & resolver info */}
              <div className="flex items-center gap-4 mt-3 text-xs text-sand-500">
                <span>Reported by: {report.reporter?.name || report.reporter?.email || "Unknown"}</span>
                {report.resolver && (
                  <span>Resolved by: {report.resolver.name || report.resolver.email}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Audit log */}
      {showActions && (
        <div className="mt-10">
          <h2 className="font-sans text-lg font-semibold mb-4">Audit Log</h2>
          {actions.length === 0 ? (
            <p className="text-sm text-sand-500">No moderation actions yet.</p>
          ) : (
            <div className="card overflow-hidden">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center gap-4 px-5 py-3 text-xs"
                  style={{ borderBottom: "1px solid rgba(128,128,128,0.06)" }}
                >
                  <span className="text-sand-500 tabular-nums shrink-0">{timeAgo(action.createdAt)}</span>
                  <span className="text-neutral-900 dark:text-sand-100 font-medium">{action.actor?.name || "System"}</span>
                  <span className="font-mono text-rugged-500 uppercase tracking-wider">{action.actionType}</span>
                  <span className="text-sand-500">{action.targetType} #{action.targetId.slice(0, 8)}</span>
                  {action.reason && <span className="text-sand-500 truncate">— {action.reason}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
