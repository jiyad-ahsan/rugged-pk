"use client";

import { sketchMap } from "@/components/Sketches";

/**
 * StepWithSketch — step text with an inline sketch illustration
 *
 * Usage in MDX:
 * <StepWithSketch sketch="backpack" title="Step 1: The Grab Bag">
 *   Keep a packed bag by your front door...
 * </StepWithSketch>
 */
export default function StepWithSketch({ sketch, title, step, children }) {
  const Sketch = sketchMap?.[sketch];

  return (
    <div className="flex gap-6 items-start my-6 pb-6"
         style={{ borderBottom: "1px solid rgba(128,128,128,0.1)" }}>
      {Sketch && (
        <div className="w-20 h-20 shrink-0 items-center justify-center hidden md:flex">
          <Sketch className="w-full h-full text-neutral-700 dark:text-sand-500 opacity-50" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        {(step || title) && (
          <h3 className="font-sans text-base font-semibold mb-1.5 text-neutral-900 dark:text-sand-100">
            {step && <span className="text-rugged-500 dark:text-rugged-400 mr-2">{step}.</span>}
            {title}
          </h3>
        )}
        <div className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
