// ShadowTrade — Auto results gallery (no renaming needed)
// Automatically finds and displays ANY image file uploaded to the repo root.
// Just upload photos to GitHub with their original names — they show up here automatically.

(function () {
  const container = document.getElementById("autoResultsGrid");
  if (!container) return;

  const REPO_API = "https://api.github.com/repos/shadowtrade010/shadowtrade010.github.io/contents/";
  const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;
  const EXCLUDE = ["result-1.jpg", "result-2.jpg"]; // old collage files, kept for backward compatibility but shown too

  fetch(REPO_API)
    .then((res) => res.json())
    .then((files) => {
      if (!Array.isArray(files)) return;

      const images = files
        .filter((f) => f.type === "file" && IMAGE_EXT.test(f.name))
        .sort((a, b) => a.name.localeCompare(b.name));

      if (images.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted); font-size:14px;">لا توجد نتائج مضافة بعد.</p>';
        return;
      }

      images.forEach((file) => {
        const img = document.createElement("img");
        img.src = file.name;
        img.alt = "نتيجة قناة التوصيات";
        img.loading = "lazy";
        container.appendChild(img);
      });
    })
    .catch(() => {
      container.innerHTML = '<p style="color:var(--text-muted); font-size:14px;">تعذّر تحميل النتائج حاليًا، حاول تحديث الصفحة.</p>';
    });
})();
