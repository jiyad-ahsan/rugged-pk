import { getAllContent } from "@/lib/guides";
import GuidesListing from "@/components/guide/GuidesListing";

export const revalidate = 3600;

// Fallback data for guides not yet in markdown files
const fallbackGuides = [
  {
    slug: "30-minute-window",
    type: "guide",
    title: "The 30-Minute Window",
    subtitle: "A Family Evacuation Plan You Can Build Tonight",
    tag: "essentials",
    date: "2026-03",
    excerpt:
      "A border escalation hits the news. Your wife calls. You have maybe 30 minutes before the roads clog. Where do you go? What do you grab? Who do you call first?",
    readTime: "14 min",
    sketch: "backpack",
    sections: ["Rally points", "Vehicle prep", "Grab bag checklist", "Communication tree"],
  },
  {
    slug: "shelter-in-place",
    type: "guide",
    title: "Shelter in Place",
    subtitle: "When Leaving Isn't an Option",
    tag: "essentials",
    date: "2025-11",
    excerpt:
      "Sometimes the safest move is no move at all. How to fortify your home for a multi-day lockdown — securing entry points, managing power and water, keeping your family calm, and knowing when it's finally time to go.",
    readTime: "13 min",
    sketch: "shelter",
    sections: ["Home security basics", "Resource management", "Information gathering", "Decision framework"],
  },
  {
    slug: "sattu-chana-emergency-food",
    type: "guide",
    title: "Sattu, Chana, and Staying Fed",
    subtitle: "When the Supply Chain Breaks",
    tag: "food & water",
    date: "2026-02",
    excerpt:
      "Forget freeze-dried Western rations nobody here has tasted. Pakistan already has the perfect emergency foods — sattu alone can sustain you for days and costs almost nothing.",
    readTime: "9 min",
    sketch: "food",
    sections: ["Why local foods win", "Sourcing guide", "Storage & rotation", "Calorie planning"],
  },
  {
    slug: "water-when-taps-stop",
    type: "guide",
    title: "Water When the Taps Stop",
    subtitle: "Purification, Storage, and Rationing for Karachi",
    tag: "food & water",
    date: "2025-12",
    excerpt:
      "Karachi's water supply is fragile on a good day. In a crisis, it's the first utility to fail. Three purification methods using materials from any local market, plus how much you actually need per person.",
    readTime: "10 min",
    sketch: "water",
    sections: ["Daily water needs", "Purification methods", "Storage in heat", "Rationing protocol"],
  },
  {
    slug: "trauma-first-aid",
    type: "guide",
    title: "Trauma First Aid",
    subtitle: "What to Do Before the Ambulance That Isn't Coming",
    tag: "medical",
    date: "2025-12",
    excerpt:
      "In an urban conflict scenario, professional medical help may be hours away or not coming at all. Tourniquet application, wound packing, and keeping someone stable — skills that save lives when the system can't.",
    readTime: "18 min",
    sketch: "medical",
    sections: ["Tourniquet basics", "Wound packing", "Chest seal application", "Shock management"],
  },
  {
    slug: "towers-go-down",
    type: "guide",
    title: "When the Towers Go Down",
    subtitle: "Emergency Comms for Pakistani Families",
    tag: "comms",
    date: "2026-01",
    excerpt:
      "During the 2024 internet shutdowns, most families had no way to reach each other beyond shouting distance. Cell towers get overloaded in minutes during a crisis.",
    readTime: "11 min",
    sketch: "radio",
    sections: ["Walkie-talkie selection", "Frequency planning", "Family check-in protocol", "Mesh networks"],
  },
  {
    slug: "neighbourhood-cluster",
    type: "guide",
    title: "Your Street Is Your First Responder",
    subtitle: "Building a Neighbourhood Cluster",
    tag: "community",
    date: "2026-01",
    excerpt:
      "In every crisis Pakistan has faced, it was neighbours who showed up first — not services, not government. This guide helps you build that into something deliberate.",
    readTime: "16 min",
    sketch: "houses",
    sections: ["Starting the conversation", "Skills mapping", "WhatsApp tree setup", "Mutual aid agreements"],
  },
];

export const metadata = {
  title: "Guides — Rugged",
  description: "Free preparedness guides for Pakistani families. Evacuation, shelter, water, food, trauma first aid, comms — practical, local, offline-ready.",
};

export default function GuidesPage() {
  // Get all content from markdown files
  const markdownContent = getAllContent();

  // Merge: markdown content takes priority, fallback fills gaps
  const markdownSlugs = new Set(markdownContent.map((c) => c.slug));
  const fallbackFill = fallbackGuides.filter((g) => !markdownSlugs.has(g.slug));
  const allContent = [...markdownContent, ...fallbackFill];

  // Sort by date descending
  allContent.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return <GuidesListing initialContent={allContent} />;
}
