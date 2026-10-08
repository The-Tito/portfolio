import type { CSSProperties } from "react";

import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

type Nodes = Dictionary["hero"]["diagram"];

type NodeProps = {
  title: string;
  detail: string;
  style: CSSProperties;
  core?: boolean;
};

function Node({ title, detail, style, core }: NodeProps) {
  return (
    <div
      style={style}
      className={cn(
        "absolute z-[2] -mt-[26px] flex h-[52px] min-w-0 flex-col justify-center overflow-hidden rounded-xl border border-line bg-bg px-3 @max-[400px]:-mt-[22px] @max-[400px]:h-11 @max-[400px]:px-2",
        core &&
          "border-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_16%,transparent)]",
      )}
    >
      <b className="truncate text-[13px] leading-tight font-semibold tracking-[-0.01em]">{title}</b>
      <small className="truncate font-mono text-[9.5px] leading-snug tracking-[0.02em] text-muted @max-[400px]:hidden">
        {detail}
      </small>
    </div>
  );
}

function Connector({
  style,
  vertical,
  delay,
}: {
  style: CSSProperties;
  vertical?: boolean;
  delay?: string;
}) {
  return (
    <span
      style={{ ...style, ...(delay ? { "--packet-delay": delay } : {}) } as CSSProperties}
      className={cn("absolute z-[1] bg-line", vertical ? "packet-v w-px" : "packet-h h-px")}
    />
  );
}

/**
 * Decorative, project-agnostic architecture sketch: client → API → LLM / SQL / jobs.
 * Positions are percentages so the drawing scales with its card.
 */
export function SystemDiagram({ nodes }: { nodes: Nodes }) {
  return (
    <div
      aria-hidden="true"
      className="@container relative h-[300px] overflow-hidden rounded-[20px] border border-line bg-bg-2 shadow-soft"
    >
      <div className="absolute inset-0 dot-grid [background-size:18px_18px] opacity-70" />

      <Connector style={{ left: "27%", width: "9%", top: "50%" }} />
      <Connector style={{ left: "58%", width: "8%", top: "50%" }} delay="0.6s" />
      <Connector style={{ left: "66%", top: "20%", height: "60%" }} vertical />
      <Connector style={{ left: "66%", width: "5%", top: "20%" }} delay="1.2s" />
      <Connector style={{ left: "66%", width: "5%", top: "80%" }} delay="1.8s" />

      <Node {...nodes.client} style={{ left: "3%", width: "24%", top: "50%" }} />
      <Node {...nodes.api} style={{ left: "36%", width: "22%", top: "50%" }} core />
      <Node {...nodes.llm} style={{ left: "71%", width: "26%", top: "20%" }} />
      <Node {...nodes.sql} style={{ left: "71%", width: "26%", top: "50%" }} />
      <Node {...nodes.jobs} style={{ left: "71%", width: "26%", top: "80%" }} />
    </div>
  );
}
