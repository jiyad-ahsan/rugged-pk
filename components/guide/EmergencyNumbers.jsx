/**
 * EmergencyNumbers — shared emergency contacts block
 * Reusable across guides so we don't repeat this everywhere
 */

const numbers = [
  { name: "Rescue / Ambulance", number: "1122", note: "Sindh Emergency Service" },
  { name: "Edhi Ambulance", number: "115", note: "Nationwide" },
  { name: "Chhipa Ambulance", number: "1021", note: "Karachi" },
  { name: "Police", number: "15", note: "" },
  { name: "Fire Brigade", number: "16", note: "" },
  { name: "Aga Khan Hospital", number: "021-111-911-911", note: "Karachi" },
  { name: "Jinnah Hospital (JPMC)", number: "021-99201300", note: "Karachi" },
];

export default function EmergencyNumbers({ show }) {
  const filtered = show
    ? numbers.filter((n) => show.includes(n.name.toLowerCase()) || show.includes("all"))
    : numbers;

  return (
    <div className="card p-5 my-6">
      <p className="font-sans text-xs font-medium uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3">
        Emergency Numbers
      </p>
      <div className="space-y-2">
        {filtered.map((item) => (
          <div key={item.number} className="flex items-baseline gap-3">
            <span className="font-mono text-sm font-medium text-neutral-900 dark:text-sand-100 tabular-nums shrink-0">
              {item.number}
            </span>
            <span className="text-xs text-sand-600 dark:text-sand-500">
              {item.name}
              {item.note && <span className="text-sand-400 dark:text-sand-700 ml-1">({item.note})</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
