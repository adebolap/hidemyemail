"use client";

import { useState } from "react";
import type { Source } from "@/lib/schemas";
import { track } from "@/lib/analytics";
import { SourceCitation } from "@/components/SourceCitation";

export function EvidenceDrawer({
  evidence,
  sources,
}: {
  evidence: string[];
  sources: Source[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="surface p-6" aria-labelledby="evidence-heading">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="evidence-heading" className="text-xl font-semibold">
            Evidence & confidence
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            {evidence.join(" · ")}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide sources" : "Show sources"}
        </button>
      </div>
      {open ? (
        <ul className="mt-5 space-y-3">
          {sources.map((source) => (
            <li key={source.id}>
              <SourceCitation
                source={source}
                onOpen={() => track("source_opened", { sourceId: source.id })}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
