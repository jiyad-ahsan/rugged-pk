const icons = {
  warning: "!",
  tip: "*",
  important: "!",
  danger: "!",
};

const styles = {
  warning: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    icon: "text-amber-600 dark:text-amber-400",
    title: "text-amber-700 dark:text-amber-400",
  },
  tip: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    icon: "text-emerald-600 dark:text-emerald-400",
    title: "text-emerald-700 dark:text-emerald-400",
  },
  important: {
    border: "border-rugged-500/30",
    bg: "bg-rugged-500/5",
    icon: "text-rugged-500 dark:text-rugged-400",
    title: "text-rugged-600 dark:text-rugged-400",
  },
  danger: {
    border: "border-rose-500/30",
    bg: "bg-rose-500/5",
    icon: "text-rose-600 dark:text-rose-400",
    title: "text-rose-700 dark:text-rose-400",
  },
};

export default function Callout({ type = "important", title, children }) {
  const s = styles[type] || styles.important;

  return (
    <div className={`${s.bg} ${s.border} border rounded-sm p-5 my-6`}>
      <div className="flex gap-3 items-start">
        <span className={`${s.icon} font-bold text-lg leading-none mt-0.5 shrink-0`}>
          {icons[type]}
        </span>
        <div className="flex-1 min-w-0">
          {title && (
            <p className={`${s.title} font-sans text-sm font-semibold mb-1`}>
              {title}
            </p>
          )}
          <div className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
