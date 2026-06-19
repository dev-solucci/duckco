import type { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export const metadata: Metadata = {
  title: { default: "Documentação", template: "%s · Docs Duck Co." },
  // Unlisted: accessible by URL, kept out of search engines.
  robots: { index: false, follow: false },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-lucky-black text-duck-cream">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <DocsSidebar />
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
