"use client";

// Black and white sketched illustrations for guides
// Each is a rough, hand-drawn style SVG

export function SketchBackpack({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Main bag body */}
        <path d="M55 65 C54 62, 58 55, 70 52 L130 52 C142 55, 146 62, 145 65 L148 155 C148 162, 143 168, 135 168 L65 168 C57 168, 52 162, 52 155 Z" />
        {/* Top flap */}
        <path d="M62 65 L138 65" strokeDasharray="4 3" />
        {/* Front pocket */}
        <path d="M72 100 L128 100 L130 145 C130 148, 128 150, 125 150 L75 150 C72 150, 70 148, 70 145 Z" />
        {/* Pocket flap */}
        <path d="M72 100 C72 92, 80 88, 100 88 C120 88, 128 92, 128 100" />
        {/* Buckle on pocket */}
        <rect x="94" y="96" width="12" height="8" rx="1" />
        {/* Left strap */}
        <path d="M70 52 C62 50, 55 48, 52 52 L48 85 C47 90, 50 92, 53 90 L60 75" />
        {/* Right strap */}
        <path d="M130 52 C138 50, 145 48, 148 52 L152 85 C153 90, 150 92, 147 90 L140 75" />
        {/* Handle on top */}
        <path d="M88 52 C88 42, 92 38, 100 38 C108 38, 112 42, 112 52" />
        {/* Side compression straps */}
        <path d="M52 90 L55 90" />
        <path d="M52 120 L55 120" />
        <path d="M145 90 L148 90" />
        <path d="M145 120 L148 120" />
        {/* Sketch texture lines */}
        <path d="M80 110 L90 110" opacity="0.3" />
        <path d="M80 118 L105 118" opacity="0.3" />
        <path d="M80 126 L95 126" opacity="0.3" />
      </g>
    </svg>
  );
}

export function SketchWater({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Water bottle */}
        <path d="M82 45 L82 55 C70 60, 65 70, 65 80 L65 155 C65 163, 72 170, 82 170 L118 170 C128 170, 135 163, 135 155 L135 80 C135 70, 130 60, 118 55 L118 45" />
        {/* Bottle cap */}
        <rect x="82" y="35" width="36" height="12" rx="3" />
        {/* Water level */}
        <path d="M68 95 C78 90, 88 98, 100 93 C112 88, 122 96, 132 92" />
        {/* Water drops */}
        <path d="M155 70 C155 70, 162 82, 162 88 C162 93, 158 96, 155 96 C152 96, 148 93, 148 88 C148 82, 155 70, 155 70" />
        <path d="M42 90 C42 90, 47 98, 47 102 C47 106, 44 108, 42 108 C40 108, 37 106, 37 102 C37 98, 42 90, 42 90" />
        {/* Filter marks inside bottle */}
        <path d="M72 120 L128 120" strokeDasharray="3 4" opacity="0.4" />
        <path d="M72 135 L128 135" strokeDasharray="3 4" opacity="0.4" />
        <path d="M72 150 L128 150" strokeDasharray="3 4" opacity="0.4" />
        {/* Wavy texture */}
        <path d="M75 105 C82 102, 90 108, 100 105 C110 102, 118 108, 125 105" opacity="0.3" />
        <path d="M75 112 C82 109, 90 115, 100 112 C110 109, 118 115, 125 112" opacity="0.3" />
      </g>
    </svg>
  );
}

export function SketchRadio({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Radio body */}
        <rect x="55" y="55" width="90" height="120" rx="6" />
        {/* Antenna */}
        <path d="M80 55 L80 25 C80 22, 78 20, 76 18" />
        <circle cx="76" cy="16" r="3" />
        {/* Screen */}
        <rect x="65" y="65" width="70" height="30" rx="2" />
        {/* Screen content - frequency display */}
        <path d="M72 75 L82 75" opacity="0.5" />
        <path d="M72 82 L92 82" opacity="0.5" />
        <path d="M110 72 L125 72 L125 88 L110 88" opacity="0.4" />
        {/* Speaker grille */}
        <path d="M75 105 L125 105" opacity="0.4" />
        <path d="M75 110 L125 110" opacity="0.4" />
        <path d="M75 115 L125 115" opacity="0.4" />
        <path d="M75 120 L125 120" opacity="0.4" />
        <path d="M75 125 L125 125" opacity="0.4" />
        <path d="M75 130 L125 130" opacity="0.4" />
        {/* Side button */}
        <path d="M55 80 L50 80 L50 95 L55 95" />
        {/* Belt clip */}
        <path d="M145 90 L152 90 L152 130 L145 130" strokeDasharray="3 2" />
        {/* Signal waves */}
        <path d="M135 40 C142 38, 148 42, 150 35" opacity="0.4" />
        <path d="M140 45 C148 43, 155 48, 158 40" opacity="0.3" />
        <path d="M145 50 C154 48, 162 54, 166 45" opacity="0.2" />
      </g>
    </svg>
  );
}

export function SketchHouses({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* House 1 - left */}
        <path d="M20 120 L20 170 L65 170 L65 120" />
        <path d="M15 120 L42 95 L70 120" />
        <rect x="30" y="140" width="12" height="30" rx="1" />
        <rect x="48" y="130" width="10" height="10" rx="1" />
        {/* House 2 - center (taller) */}
        <path d="M75 100 L75 170 L125 170 L125 100" />
        <path d="M70 100 L100 72 L130 100" />
        <rect x="88" y="140" width="14" height="30" rx="1" />
        <rect x="80" y="115" width="10" height="12" rx="1" />
        <rect x="110" y="115" width="10" height="12" rx="1" />
        {/* House 3 - right */}
        <path d="M135 115 L135 170 L180 170 L180 115" />
        <path d="M130 115 L157 92 L185 115" />
        <rect x="148" y="142" width="12" height="28" rx="1" />
        <rect x="140" y="125" width="8" height="10" rx="1" />
        {/* Connection lines between houses (community) */}
        <path d="M42 130 C55 125, 70 125, 85 115" strokeDasharray="4 3" opacity="0.4" />
        <path d="M115 115 C125 118, 132 118, 145 125" strokeDasharray="4 3" opacity="0.4" />
        {/* People dots */}
        <circle cx="42" cy="168" r="2.5" fill="currentColor" opacity="0.3" />
        <circle cx="100" cy="168" r="2.5" fill="currentColor" opacity="0.3" />
        <circle cx="157" cy="168" r="2.5" fill="currentColor" opacity="0.3" />
        {/* Ground line */}
        <path d="M10 172 L190 172" opacity="0.2" strokeDasharray="2 4" />
      </g>
    </svg>
  );
}

export function SketchMedical({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Medical bag */}
        <path d="M40 80 L40 160 C40 165, 45 170, 50 170 L150 170 C155 170, 160 165, 160 160 L160 80 C160 75, 155 70, 150 70 L50 70 C45 70, 40 75, 40 80 Z" />
        {/* Handle */}
        <path d="M75 70 L75 55 C75 50, 80 45, 85 45 L115 45 C120 45, 125 50, 125 55 L125 70" />
        {/* Cross */}
        <rect x="88" y="95" width="24" height="50" rx="2" />
        <rect x="76" y="108" width="48" height="24" rx="2" />
        {/* Latch */}
        <path d="M95 70 L105 70 L105 78 L95 78" />
        {/* Texture lines */}
        <path d="M50 165 L60 165" opacity="0.2" />
        <path d="M140 165 L150 165" opacity="0.2" />
      </g>
    </svg>
  );
}

export function SketchFood({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Sattu/flour bag */}
        <path d="M40 75 C40 65, 50 58, 60 60 L85 60 C90 58, 92 62, 90 68 L90 145 C90 152, 82 158, 72 158 L58 158 C48 158, 40 152, 40 145 Z" />
        {/* Bag tie */}
        <path d="M55 65 C60 58, 72 58, 78 65" />
        <path d="M65 55 L65 48" />
        {/* Label on bag */}
        <rect x="48" y="90" width="34" height="40" rx="1" opacity="0.3" />
        <path d="M54 100 L76 100" opacity="0.3" />
        <path d="M54 108 L70 108" opacity="0.3" />
        <path d="M54 116 L72 116" opacity="0.3" />
        {/* Dates cluster */}
        <ellipse cx="130" cy="85" rx="12" ry="8" />
        <ellipse cx="142" cy="78" rx="10" ry="7" />
        <ellipse cx="125" cy="75" rx="9" ry="6" />
        <path d="M132 68 L135 55 C136 52, 140 50, 142 52" />
        {/* Chana/nuts scattered */}
        <ellipse cx="120" cy="140" rx="5" ry="4" />
        <ellipse cx="135" cy="145" rx="5" ry="4" />
        <ellipse cx="128" cy="152" rx="5" ry="4" />
        <ellipse cx="145" cy="138" rx="4" ry="3.5" />
        <ellipse cx="150" cy="148" rx="5" ry="4" />
        <ellipse cx="140" cy="155" rx="4" ry="3.5" />
        {/* Bowl */}
        <path d="M108 130 C108 128, 112 125, 140 125 C168 125, 172 128, 172 130 L168 158 C168 165, 158 170, 140 170 C122 170, 112 165, 112 158 Z" strokeDasharray="3 2" opacity="0.3" />
      </g>
    </svg>
  );
}

export function SketchShelter({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Tent */}
        <path d="M20 160 L100 50 L180 160" />
        <path d="M100 50 L100 45" />
        {/* Tent opening */}
        <path d="M85 160 L100 110 L115 160" />
        {/* Guy ropes */}
        <path d="M60 105 L30 120" strokeDasharray="4 3" opacity="0.5" />
        <path d="M140 105 L170 120" strokeDasharray="4 3" opacity="0.5" />
        {/* Stakes */}
        <path d="M28 118 L32 125" />
        <path d="M168 118 L172 125" />
        {/* Ground */}
        <path d="M10 162 L190 162" opacity="0.2" strokeDasharray="2 4" />
        {/* Tent texture */}
        <path d="M55 130 L100 65 L145 130" opacity="0.1" />
      </g>
    </svg>
  );
}

// Map of sketch names to components for easy lookup
export const sketchMap = {
  backpack: SketchBackpack,
  water: SketchWater,
  radio: SketchRadio,
  houses: SketchHouses,
  medical: SketchMedical,
  food: SketchFood,
  shelter: SketchShelter,
};
