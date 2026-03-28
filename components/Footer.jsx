import Link from "next/link";

const footerCols = [
  {
    title: "Resources",
    links: [
      { label: "All Guides", href: "/guides" },
      { label: "Forum", href: "/forum" },
      { label: "Workshops", href: "#" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Starter Kit", href: "/shop" },
      { label: "Family Kit", href: "/shop" },
      { label: "Urban Conflict Kit", href: "/shop" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "WhatsApp", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="section-container py-12">
      {/* Top */}
      <div className="flex flex-col md:flex-row justify-between gap-8 pb-8 border-b border-black/10 dark:border-white/8">
        <div>
          <div className="font-sans font-bold text-base tracking-widest flex items-center gap-2">
            <span className="text-rugged-500 dark:text-rugged-400 text-xl leading-none">
              ▮
            </span>
            RUGGED
          </div>
          <p className="text-sm text-sand-600 dark:text-sand-500 mt-2">
            Preparedness for Pakistani families.
          </p>
        </div>

        <div className="flex gap-12">
          {footerCols.map((col) => (
            <div key={col.title} className="flex flex-col gap-2">
              <span className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-sand-600 dark:text-sand-500 mb-1">
                {col.title}
              </span>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-sand-600 dark:text-sand-500 no-underline 
                             hover:text-rugged-500 dark:hover:text-rugged-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-between pt-6 text-xs text-sand-600 dark:text-sand-500">
        <span>© 2026 Rugged · rugged.pk</span>
        <span className="italic opacity-70">Made in Karachi</span>
      </div>
    </footer>
  );
}
