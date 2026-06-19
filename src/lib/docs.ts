import { readFileSync } from "fs";
import { join } from "path";

/** Read a doc markdown file. Runs at build time for the static docs pages. */
export function readDoc(slug: string): string {
  return readFileSync(join(process.cwd(), "docs", `${slug}.md`), "utf8");
}
