import Link from "next/link";

/**
 * FieldCardRef — inline reference to a field card from within a guide
 *
 * Usage in MDX:
 * <FieldCardRef slug="fc-tourniquet" title="Tourniquet Field Card" />
 */
export default function FieldCardRef({ slug, title }) {
  return (
    <Link
      href={`/guides/${slug}`}
      className="inline-flex items-center gap-1.5 text-sm text-rugged-500 dark:text-rugged-400
                 no-underline hover:underline font-medium"
    >
      <span className="text-[10px] font-mono bg-rugged-500/10 dark:bg-rugged-400/10
                        px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
        FC
      </span>
      {title}
    </Link>
  );
}
