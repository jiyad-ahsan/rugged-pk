import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Callout from "./Callout";
import SupplyList, { Item } from "./SupplyList";
import StepWithSketch from "./StepWithSketch";
import EmergencyNumbers from "./EmergencyNumbers";
import PrintNote from "./PrintNote";
import FieldCardRef from "./FieldCardRef";

const components = {
  Callout,
  SupplyList,
  Item,
  StepWithSketch,
  EmergencyNumbers,
  PrintNote,
  FieldCardRef,

  // Override default HTML elements for guide styling
  h2: (props) => {
    const text = typeof props.children === "string" ? props.children : "";
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return (
      <h2
        id={slug}
        className="font-sans text-xl font-bold tracking-tight mt-12 mb-4 pt-8
                   text-neutral-900 dark:text-sand-100 scroll-mt-24"
        style={{ borderTop: "1px solid rgba(128,128,128,0.12)" }}
        {...props}
      />
    );
  },
  h3: (props) => {
    const text = typeof props.children === "string" ? props.children : "";
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return (
      <h3
        id={slug}
        className="font-sans text-lg font-semibold mt-8 mb-3 text-neutral-900 dark:text-sand-100 scroll-mt-24"
        {...props}
      />
    );
  },
  p: (props) => (
    <p className="text-sm text-sand-600 dark:text-sand-500 leading-loose mb-4" {...props} />
  ),
  ul: (props) => (
    <ul className="text-sm text-sand-600 dark:text-sand-500 leading-loose mb-4 pl-5 list-disc space-y-1.5" {...props} />
  ),
  ol: (props) => (
    <ol className="text-sm text-sand-600 dark:text-sand-500 leading-loose mb-4 pl-5 list-decimal space-y-1.5" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-neutral-900 dark:text-sand-100" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 pl-5 text-sm text-sand-500 dark:text-sand-600 italic leading-relaxed"
      style={{ borderLeft: "3px solid rgba(201,75,48,0.3)" }}
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-10 border-none h-px" style={{ background: "rgba(128,128,128,0.15)" }} />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="text-left text-xs font-medium uppercase tracking-wider text-sand-500 dark:text-sand-600
                   px-3 py-2 bg-sand-100 dark:bg-sand-800" {...props} />
  ),
  td: (props) => (
    <td className="px-3 py-2 text-sand-600 dark:text-sand-500"
        style={{ borderBottom: "1px solid rgba(128,128,128,0.1)" }}
        {...props} />
  ),
};

export default function GuideContent({ source }) {
  return (
    <div className="max-w-2xl guide-content">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
