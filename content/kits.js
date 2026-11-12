/**
 * Static kit details, shown while the shop is closed (SHOP_ENABLED = false
 * in lib/features.js). Copied from the kit entries in prisma/seed.js so the
 * site needs no database. Keep in sync with the seed if kits change.
 */
const kits = [
  {
    name: "Starter Kit",
    slug: "starter-kit",
    subtitle: "72 hours. One person.",
    price: 10000,
    highlight: "Start here",
    description:
      "Everything one person needs to survive 72 hours with no infrastructure. Packed in a grab-and-go canvas bag that lives by your front door.",
    items: [
      "9 meals, 1,800+ cal/day, shelf-stable local foods",
      "Water purification for 72L (3 days drinking + cooking)",
      "LED torch + 48-hour battery supply",
      "First aid kit, 35+ components",
      "Waterproof document safe",
      "Canvas grab bag, ready to move",
    ],
  },
  {
    name: "Family Kit",
    slug: "family-kit",
    subtitle: "4–5 days. Four people.",
    price: 40000,
    highlight: "Most popular",
    description:
      "Your household covered for almost a week. Enough food for four people at full calories, a way to communicate when the networks collapse, and medical supplies that go beyond band-aids.",
    items: [
      "60+ meals, 2,000 cal/person/day for 4 people",
      "Gravity water filter, processes 500L+",
      "Walkie-talkie pair, pre-set, 1-2km urban range",
      "20,000mAh power bank",
      "Comprehensive medical kit, 80+ components",
      "Emergency shelter + 4x thermal blankets",
    ],
  },
  {
    name: "Urban Conflict Kit",
    slug: "urban-conflict-kit",
    subtitle: "5+ days. Full readiness.",
    price: 95000,
    highlight: "Complete protection",
    description:
      "Built for the scenario nobody wants to say out loud. Trauma-grade medical. Solar power that doesn't depend on anything. Extended comms. Enough to sustain your household while you figure out your next move.",
    items: [
      "80+ meals, 2,000 cal/person/day, 5-day supply for 4",
      "Filtration system, processes 1,000L of any freshwater",
      "Long-range walkie-talkies, 2-3km urban, spare batteries",
      "Solar panel + power bank hybrid, daytime recharge in sun",
      "Trauma medical: tourniquets, chest seals, splints, 120+ items",
      "Multi-tool, document safe, full printed inventory",
    ],
  },
];

export default kits;
