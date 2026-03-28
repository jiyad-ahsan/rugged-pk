"use client";

import { useState, useEffect } from "react";
import { registerSW, saveGuideOffline, isGuideCached } from "@/lib/sw";

export default function SaveOfflineButton({ slug }) {
  const [cached, setCached] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    registerSW();
    const timer = setTimeout(() => {
      isGuideCached(slug).then(setCached);
    }, 1000);
    return () => clearTimeout(timer);
  }, [slug]);

  async function handleSave() {
    setSaving(true);
    const result = await saveGuideOffline(slug);
    if (result?.status === "cached") {
      setCached(true);
    }
    setSaving(false);
  }

  if (cached) {
    return (
      <button className="btn-primary text-sm opacity-70 cursor-default" disabled>
        ✓ Saved offline
      </button>
    );
  }

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className="btn-primary text-sm disabled:opacity-50"
    >
      {saving ? "Saving..." : "↓ Download for offline"}
    </button>
  );
}
