/**
 * PrintNote — reminder to print the guide/card
 */
export default function PrintNote({ children }) {
  return (
    <div className="my-6 p-4 bg-sand-100 dark:bg-sand-800 rounded-sm flex gap-3 items-start print:hidden">
      <span className="text-sand-500 text-base leading-none mt-0.5 shrink-0">&#9113;</span>
      <p className="text-xs text-sand-600 dark:text-sand-500 leading-relaxed m-0">
        {children || "Print this page and keep it in your grab bag. The moment you need this information is the moment the internet might not be there."}
      </p>
    </div>
  );
}
