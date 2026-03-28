/**
 * SupplyList — formatted checklist of items
 *
 * Usage in MDX:
 * <SupplyList title="Grab Bag Essentials">
 *   <Item name="Cash" detail="Rs. 20,000 in Rs. 500 and Rs. 1,000 notes" priority="critical" />
 *   <Item name="Water purification tabs" detail="Aquatabs, pack of 50 — Rs. 300" />
 *   <Item name="Torch + batteries" detail="LED, AA batteries" />
 * </SupplyList>
 */

export function Item({ name, detail, priority, price }) {
  return (
    <li className="flex items-start gap-3 py-2.5"
        style={{ borderBottom: "1px solid rgba(128,128,128,0.08)" }}>
      <span className={`shrink-0 mt-1 w-4 h-4 rounded-sm flex items-center justify-center text-[10px]
        ${priority === "critical"
          ? "bg-rugged-500/15 text-rugged-500 dark:text-rugged-400 font-bold"
          : "bg-sand-200 dark:bg-sand-800 text-sand-500"
        }`}
      >
        {priority === "critical" ? "!" : ""}
      </span>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-neutral-900 dark:text-sand-100">
          {name}
        </span>
        {price && (
          <span className="text-xs text-rugged-500 dark:text-rugged-400 ml-2">
            {price}
          </span>
        )}
        {detail && (
          <p className="text-xs text-sand-600 dark:text-sand-500 mt-0.5 leading-relaxed">
            {detail}
          </p>
        )}
      </div>
    </li>
  );
}

export default function SupplyList({ title, children }) {
  return (
    <div className="card p-5 my-6">
      {title && (
        <p className="font-sans text-xs font-medium uppercase tracking-wider text-sand-500 dark:text-sand-600 mb-3">
          {title}
        </p>
      )}
      <ul className="list-none m-0 p-0">
        {children}
      </ul>
    </div>
  );
}
