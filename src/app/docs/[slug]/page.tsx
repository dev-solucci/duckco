import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { Markdown } from "@/components/docs/Markdown";
import { allDocs, docBySlug } from "@/data/docs";
import { readDoc } from "@/lib/docs";

export function generateStaticParams() {
  return allDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = docBySlug[slug];
  return { title: doc ? doc.title : "Documento" };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docBySlug[slug];
  if (!doc) notFound();

  const content = readDoc(slug);

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-chrome-silver">
        <Link href="/docs" className="transition hover:text-lucky-yellow">
          Docs
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-duck-cream">{doc.title}</span>
      </nav>

      <article className="rounded-2xl bg-off-white p-6 shadow-2xl sm:p-10">
        <Markdown content={content} />
      </article>
    </div>
  );
}
