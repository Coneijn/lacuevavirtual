interface ReadingProgressProps {
  slug: string;
  title: string;
}

export default function ReadingProgress({ slug, title }: ReadingProgressProps) {
  const scriptContent = `
    (function() {
      var bar = document.getElementById("cueva-progress-bar");
      if (!bar) return;

      var slug = "${slug}";
      var title = "${title.replace(/"/g, '\\"')}";

      function updateProgress() {
        var scrollingEl = document.scrollingElement || document.documentElement || document.body;
        var sTop = scrollingEl.scrollTop || window.scrollY || window.pageYOffset || 0;
        var sHeight = scrollingEl.scrollHeight || 0;
        var cHeight = scrollingEl.clientHeight || window.innerHeight || 0;
        var total = sHeight - cHeight;

        if (total > 0) {
          var percent = Math.min(100, Math.max(0, Math.round((sTop / total) * 100)));
          bar.style.width = percent + "%";

          if (percent > 1) {
            try {
              localStorage.setItem("cueva_virtual_bookmark", JSON.stringify({
                slug: slug,
                title: title,
                progress: percent,
                timestamp: Date.now()
              }));
            } catch(e) {}
          }
        }
      }

      window.addEventListener("scroll", updateProgress, { passive: true });
      window.addEventListener("touchmove", updateProgress, { passive: true });
      window.addEventListener("resize", updateProgress, { passive: true });
      
      setInterval(updateProgress, 500);
      updateProgress();
    })();
  `;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-zinc-200/40 dark:bg-zinc-800/60 pointer-events-none">
        <div
          id="cueva-progress-bar"
          suppressHydrationWarning={true}
          className="h-full bg-amber-500 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          style={{ width: "0%" }}
        />
      </div>
      <script
        suppressHydrationWarning={true}
        dangerouslySetInnerHTML={{ __html: scriptContent }}
      />
    </>
  );
}