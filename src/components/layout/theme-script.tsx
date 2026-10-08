import { INTRO_STORAGE_KEY, THEME_STORAGE_KEY } from "@/lib/theme";

import { InlineScript } from "./inline-script";

/**
 * Applies the theme before first paint (saved choice → system preference → dark)
 * and marks the intro loader as seen after the first visit in the session.
 */
const script = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.classList.toggle("dark",t==="dark");if(sessionStorage.getItem("${INTRO_STORAGE_KEY}")){d.classList.add("loader-seen")}else{sessionStorage.setItem("${INTRO_STORAGE_KEY}","1")}}catch(e){d.classList.add("dark")}})();`;

export function ThemeScript() {
  return <InlineScript html={script} />;
}
