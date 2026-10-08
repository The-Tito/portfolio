import { notFound } from "next/navigation";

/** Sends unknown paths under a locale (e.g. `/en/nope`) to the localized not-found page. */
export default function CatchAll(): never {
  notFound();
}
