import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ComponentPropsWithoutRef } from "react";

const GITHUB_BASE = "https://github.com/dev-solucci/duckco/blob/main/";

/** Resolve a markdown link to something that works on the site. */
function resolveHref(href?: string): string {
  if (!href) return "#";
  if (/^(https?:|#|mailto:)/.test(href)) return href;
  const clean = href.replace(/^\.\//, "");
  if (clean.endsWith(".md")) {
    const slug = clean.split("/").pop()!.replace(/\.md$/, "");
    return `/docs/${slug}`;
  }
  if (clean.startsWith("../")) {
    return GITHUB_BASE + clean.replace(/^(\.\.\/)+/, "");
  }
  return href;
}

function resolveImg(src?: string): string {
  if (!src) return "";
  if (src.startsWith("../assets/")) return "/brand/" + src.split("/").pop();
  return src;
}

export function Markdown({ content }: { content: string }) {
  return (
    <div className="font-sans text-[0.95rem] leading-relaxed text-lucky-black/85">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (p) => (
            <h1 className="mb-5 mt-2 font-display text-4xl uppercase leading-none text-lucky-black sm:text-5xl" {...p} />
          ),
          h2: (p) => (
            <h2 className="mb-3 mt-10 border-b-2 border-lucky-black/10 pb-2 font-display text-2xl uppercase text-money-green sm:text-3xl" {...p} />
          ),
          h3: (p) => (
            <h3 className="mb-2 mt-7 font-display text-xl uppercase text-lucky-black" {...p} />
          ),
          h4: (p) => (
            <h4 className="mb-1 mt-5 font-mono text-xs font-bold uppercase tracking-widest text-money-green" {...p} />
          ),
          p: (p) => <p className="my-3" {...p} />,
          a: ({ href, ...rest }: ComponentPropsWithoutRef<"a">) => {
            const resolved = resolveHref(href);
            const external = /^https?:/.test(resolved);
            return (
              <a
                href={resolved}
                className="font-medium text-money-green underline decoration-money-green/40 underline-offset-2 transition hover:decoration-money-green"
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                {...rest}
              />
            );
          },
          ul: (p) => <ul className="my-3 ml-5 list-disc space-y-1 marker:text-money-green" {...p} />,
          ol: (p) => <ol className="my-3 ml-5 list-decimal space-y-1 marker:text-money-green" {...p} />,
          li: (p) => <li className="pl-1" {...p} />,
          strong: (p) => <strong className="font-bold text-lucky-black" {...p} />,
          em: (p) => <em className="italic" {...p} />,
          blockquote: (p) => (
            <blockquote className="my-4 border-l-4 border-money-green bg-money-green/5 py-1 pl-4 italic text-lucky-black/70" {...p} />
          ),
          hr: () => <hr className="my-8 border-lucky-black/15" />,
          code: (p) => (
            <code className="rounded bg-lucky-black/10 px-1.5 py-0.5 font-mono text-[0.85em] text-lucky-black" {...p} />
          ),
          pre: (p) => (
            <pre className="my-4 overflow-x-auto rounded-lg bg-lucky-black p-4 font-mono text-xs leading-relaxed text-duck-cream [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-duck-cream" {...p} />
          ),
          table: (p) => (
            <div className="my-5 overflow-x-auto">
              <table className="w-full border-collapse text-sm" {...p} />
            </div>
          ),
          thead: (p) => <thead className="bg-money-green text-duck-cream" {...p} />,
          th: (p) => <th className="border border-lucky-black/15 px-3 py-2 text-left font-mono text-xs uppercase tracking-wider" {...p} />,
          td: (p) => <td className="border border-lucky-black/15 px-3 py-2 align-top" {...p} />,
          img: ({ src, alt }) => {
            const resolved = resolveImg(typeof src === "string" ? src : "");
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={resolved} alt={alt ?? ""} className="my-4 max-w-full rounded-lg border border-lucky-black/10" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
