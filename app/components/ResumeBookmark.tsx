import Link from "next/link";

export default function ResumeBookmark() {
  const scriptContent = `
    (function() {
      function checkBookmark() {
        try {
          var saved = localStorage.getItem("cueva_virtual_bookmark");
          if (!saved) return;

          var parsed = JSON.parse(saved);
          if (parsed && parsed.slug && parsed.title && parsed.progress > 1) {
            var container = document.getElementById("cueva-resume-banner");
            var titleEl = document.getElementById("cueva-bookmark-title");
            var progressEl = document.getElementById("cueva-bookmark-progress");
            var linkEl = document.getElementById("cueva-bookmark-link");

            if (container && titleEl && progressEl && linkEl) {
              titleEl.innerText = parsed.title;
              progressEl.innerText = parsed.progress + "%";
              linkEl.setAttribute("href", "/capitulo/" + parsed.slug);
              container.style.display = "flex";
            }
          }
        } catch(e) {}
      }

      checkBookmark();
      window.addEventListener("focus", checkBookmark);
      window.addEventListener("pageshow", checkBookmark);
    })();
  `;

  return (
    <>
      <div
        id="cueva-resume-banner"
        suppressHydrationWarning={true}
        style={{ display: "none" }}
        className="mb-10 p-4 border border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
      >
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-700 dark:text-amber-400 font-bold">
            🔖 Continuar Lectura
          </span>
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Te quedaste en:{" "}
            <span
              id="cueva-bookmark-title"
              suppressHydrationWarning={true}
              className="font-serif italic"
            />{" "}
            (
            <span
              id="cueva-bookmark-progress"
              suppressHydrationWarning={true}
            />{" "}
            avanzado)
          </p>
        </div>

        <Link
          id="cueva-bookmark-link"
          suppressHydrationWarning={true}
          href="#"
          className="shrink-0 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-zinc-950 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          Reanudar →
        </Link>
      </div>
      <script
        suppressHydrationWarning={true}
        dangerouslySetInnerHTML={{ __html: scriptContent }}
      />
    </>
  );
}