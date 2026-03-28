const kits = [
  {
    id: "starter",
    name: "Starter Kit",
    subtitle: "72 hours. One person.",
    price: "10,000",
    desc: "Everything one person needs to survive 72 hours with no infrastructure. Packed in a grab-and-go canvas bag that lives by your front door. You stop thinking about it. It's just there when you need it.",
    highlight: "Start here",
    hero: false,
    items: [
      "9 meals — 1,800+ cal/day, shelf-stable local foods",
      "Water purification for 72L (3 days drinking + cooking)",
      "LED torch + 48-hour battery supply",
      "First aid kit — 35+ components",
      "Waterproof document safe",
      "Canvas grab bag — ready to move",
    ],
  },
  {
    id: "family",
    name: "Family Kit",
    subtitle: "4–5 days. Four people.",
    price: "40,000",
    desc: "Your household covered for almost a week. Enough food for four people at full calories, a way to communicate when the networks collapse, power that doesn't depend on KESC, and medical supplies that go well beyond band-aids.",
    highlight: "Most popular",
    hero: false,
    items: [
      "60+ meals — 2,000 cal/person/day for 4 people",
      "Gravity water filter — processes 500L+",
      "Walkie-talkie pair — pre-set, 1–2km urban range",
      "20,000mAh power bank (Rugged-branded)",
      "Comprehensive medical kit — 80+ components",
      "Emergency shelter + 4× thermal blankets",
    ],
  },
  {
    id: "ultimate",
    name: "Urban Conflict Kit",
    subtitle: "5+ days. Full readiness.",
    price: "95,000",
    desc: "Built for the scenario nobody wants to say out loud. Trauma-grade medical. Solar power that doesn't depend on anything. Extended comms. Enough to sustain your household while you figure out your next move. This is the kit we wish didn't need to exist.",
    highlight: "Complete protection",
    hero: true,
    items: [
      "80+ meals — 2,000 cal/person/day, 5-day supply for 4",
      "Filtration system — processes 1,000L of any freshwater",
      "Long-range walkie-talkies — 2–3km urban, spare batteries",
      "Solar panel + power bank hybrid — daytime recharge in sun",
      "Trauma medical — tourniquets, chest seals, splints, 120+ items",
      "Multi-tool, document safe, full printed inventory",
    ],
  },
];

const gearCategories = [
  {
    name: "Communication",
    items: [
      { name: "Walkie-Talkie Pair (pre-set frequencies)", price: "6,500", badge: null },
      { name: "Long-Range Walkie-Talkies (2–3km urban)", price: "14,000", badge: null },
      { name: "Emergency Whistle (3-pack)", price: "500", badge: null },
    ],
  },
  {
    name: "Power",
    items: [
      { name: "Rugged Power Bank (20,000mAh)", price: "5,500", badge: "branded" },
      { name: "Portable Solar Panel (foldable, 20W)", price: "12,000", badge: null },
      { name: "AA Battery Pack (48 count)", price: "1,200", badge: null },
      { name: "LED Torch (500 lumens, AA powered)", price: "1,800", badge: null },
      { name: "Hand-Crank Radio + Torch", price: "3,500", badge: null },
    ],
  },
  {
    name: "Water",
    items: [
      { name: "Gravity Water Filter (processes 1000L)", price: "8,500", badge: null },
      { name: "Water Purification Tablets (100 count)", price: "1,200", badge: null },
      { name: "Collapsible Water Container (10L)", price: "1,500", badge: null },
    ],
  },
  {
    name: "Food",
    items: [
      { name: "Sattu Emergency Pack (5-day supply)", price: "1,800", badge: "local" },
      { name: "Dried Dates & Apricot Mix (1kg)", price: "1,200", badge: "local" },
      { name: "Roasted Chana (1kg, vacuum sealed)", price: "800", badge: "local" },
      { name: "Complete Food Box — 4 people, 3 days", price: "4,500", badge: "local" },
    ],
  },
  {
    name: "Medical",
    items: [
      { name: "First Aid Essentials Kit", price: "2,500", badge: null },
      { name: "Comprehensive Medical Kit", price: "7,500", badge: null },
      { name: "Trauma Kit (tourniquets, chest seals, splints)", price: "15,000", badge: null },
    ],
  },
  {
    name: "Shelter & Tools",
    items: [
      { name: "2-Person Emergency Tent", price: "8,000", badge: null },
      { name: "Thermal Blankets (4-pack)", price: "1,500", badge: null },
      { name: "Heavy-Duty Multi-Tool", price: "3,500", badge: null },
      { name: "Waterproof Documents Pouch", price: "900", badge: null },
      { name: "550 Paracord (30m)", price: "700", badge: null },
    ],
  },
];

export const metadata = {
  title: "Shop — Rugged",
  description: "Preparedness kits and individual gear built for Pakistani families. Local foods, reliable power, real medical supplies.",
};

export default function ShopPage() {
  return (
    <div className="section-container py-16">
      {/* ══════ HEADER ══════ */}
      <div className="mb-12">
        <p className="font-mono text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-wider mb-4">
          Shop
        </p>
        <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Kits or piece by piece.
          <br />
          <span className="text-sand-600 dark:text-sand-500">Your call.</span>
        </h1>
        <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed max-w-lg">
          Start with a curated kit or build your own setup one item at a time. Everything
          is sourced locally where possible, tested in our conditions, and ships with a
          printed checklist.
        </p>
      </div>

      {/* ══════ KITS ══════ */}
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-8">
          <span className="section-title">Curated Kits</span>
          <span className="section-note">save 15–20% vs buying items separately</span>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {kits.map((kit) => (
            <div
              key={kit.id}
              className={`
                card p-7 relative flex flex-col
                ${kit.hero
                  ? "border-2 !border-rugged-500 dark:!border-rugged-400"
                  : ""
                }
              `}
              style={kit.hero ? { background: "rgba(201, 75, 48, 0.04)" } : {}}
            >
              {kit.hero && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rugged-500 dark:bg-rugged-400 text-white text-[0.65rem] font-mono tracking-widest px-3 py-1 rounded-sm whitespace-nowrap">
                  ★ MOST COMPREHENSIVE
                </div>
              )}

              <div className="mb-5">
                <span className="text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-widest font-medium">
                  {kit.highlight}
                </span>
                <h2 className="font-sans text-xl font-bold tracking-tight mt-1">
                  {kit.name}
                </h2>
                <p className="text-sm text-sand-600 dark:text-sand-500 mt-0.5">
                  {kit.subtitle}
                </p>
              </div>

              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-sm text-sand-600 dark:text-sand-500">Rs.</span>
                <span className="font-sans text-3xl font-bold tracking-tight">
                  {kit.price}
                </span>
              </div>

              <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-5">
                {kit.desc}
              </p>

              <ul className="mb-6 space-y-2.5 flex-1">
                {kit.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-neutral-900 dark:text-sand-100 flex items-start gap-2"
                  >
                    <span className="text-rugged-500 dark:text-rugged-400 font-bold text-base leading-none mt-0.5">
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-3">
                <button
                  className={kit.hero ? "btn-primary w-full text-center" : "btn-outline w-full text-center"}
                >
                  {kit.hero ? "Get the full kit →" : "Add to cart →"}
                </button>
                <button className="w-full text-center text-xs font-mono text-sand-500 dark:text-sand-600 
                                   hover:text-rugged-500 dark:hover:text-rugged-400
                                   bg-transparent border-none cursor-pointer transition-colors py-1">
                  View full specs ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ INDIVIDUAL GEAR ══════ */}
      <div className="mt-20">
        <div className="flex justify-between items-baseline mb-4">
          <span className="section-title">Individual Gear</span>
          <span className="section-note">build your own setup</span>
        </div>
        <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed max-w-xl mb-10">
          Don't need the full kit? Pick what matters most to you and start there.
          Every item here is the same quality that goes into our curated kits —
          no filler products, no corner cutting.
        </p>

        <div className="space-y-12">
          {gearCategories.map((cat) => (
            <div key={cat.name}>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-sand-100 mb-4 pb-2"
                  style={{ borderBottom: "1px solid rgba(128,128,128,0.15)" }}>
                {cat.name}
              </h3>
              <div className="space-y-0">
                {cat.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 cursor-pointer group"
                    style={{ borderBottom: "1px solid rgba(128,128,128,0.08)" }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-sm text-neutral-900 dark:text-sand-100 group-hover:text-rugged-500 dark:group-hover:text-rugged-400 transition-colors">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className={`
                          text-[0.6rem] uppercase tracking-widest font-medium px-2 py-0.5 rounded-sm shrink-0
                          ${item.badge === "branded"
                            ? "text-rugged-500 dark:text-rugged-400"
                            : "text-emerald-700 dark:text-emerald-400"
                          }
                        `}
                          style={{
                            background: item.badge === "branded"
                              ? "rgba(201, 75, 48, 0.08)"
                              : "rgba(4, 120, 87, 0.08)",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-sm text-sand-600 dark:text-sand-500 tabular-nums">
                        Rs. {item.price}
                      </span>
                      <button className="font-mono text-xs text-rugged-500 dark:text-rugged-400
                                         opacity-0 group-hover:opacity-100 transition-opacity
                                         bg-transparent border-none cursor-pointer whitespace-nowrap">
                        + Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ MERCH — COMING SOON ══════ */}
      <div className="mt-20">
        <div className="flex justify-between items-baseline mb-4">
          <span className="section-title">Merch</span>
          <span className="section-note">coming soon</span>
        </div>
        <div className="card p-8 text-center max-w-lg mx-auto">
          <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-2">
            Hoodies, masks, caps. Wear the signal.
          </p>
          <p className="text-xs text-sand-600 dark:text-sand-500 opacity-70">
            Merch drops when the community is ready. Join the forum to be first to know.
          </p>
        </div>
      </div>

      {/* ══════ TRUST STRIP ══════ */}
      <div className="mt-20 pt-8" style={{ borderTop: "1px solid rgba(128,128,128,0.15)" }}>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <span className="text-sm font-sans font-semibold text-neutral-900 dark:text-sand-100 block mb-1">
              Locally sourced
            </span>
            <span className="text-xs text-sand-600 dark:text-sand-500">
              Pakistani foods, local market components, nothing your family hasn't seen before
            </span>
          </div>
          <div>
            <span className="text-sm font-sans font-semibold text-neutral-900 dark:text-sand-100 block mb-1">
              Tested, not theoretical
            </span>
            <span className="text-xs text-sand-600 dark:text-sand-500">
              Every item tested in Karachi conditions — heat, humidity, power outages
            </span>
          </div>
          <div>
            <span className="text-sm font-sans font-semibold text-neutral-900 dark:text-sand-100 block mb-1">
              Rotation reminders
            </span>
            <span className="text-xs text-sand-600 dark:text-sand-500">
              We'll remind you when food or medical supplies need replacing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
