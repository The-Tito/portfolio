/**
 * Renders a script that runs synchronously during HTML parsing (before first paint).
 * On the client the tag becomes inert `text/plain`, so React neither re-runs it nor
 * warns about rendering <script>. See Next docs: "Preventing flash before hydration".
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
