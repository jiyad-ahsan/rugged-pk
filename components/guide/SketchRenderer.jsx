"use client";

import { sketchMap } from "@/components/Sketches";

/**
 * Client component wrapper for rendering sketches by key
 * Needed because sketchMap can't be used directly in server components
 */
export default function SketchRenderer({ sketchKey, className = "" }) {
  const Sketch = sketchMap[sketchKey];
  if (!Sketch) return null;
  return <Sketch className={className} />;
}
