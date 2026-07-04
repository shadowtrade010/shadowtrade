// ShadowTrade Academy — lecture player + progress tracking
// Progress is stored locally in the student's browser (no server yet).

const LECTURES = [
  { id: "l0", title: "المحاضرة التمهيدية", videoId: "p1vTmk92vtc" },
  { id: "l1", title: "المحاضرة الأولى", videoId: "WXYHqZgDPNQ" },
  { id: "l2", title: "المحاضرة الثانية", videoId: "LMG9ys9NbAY" },
  { id: "l3", title: "المحاضرة الثالثة", videoId: "i4sI0QiV93g" },
  { id: "l4", title: "المحاضرة الرابعة", videoId: "79vHRf1oAFM" },
  { id: "l5", title: "المحاضرة الخامسة", videoId: "6C8ZDrd8_y8" },
  { id: "l6a", title: "المحاضرة السادسة — الجزء الأول", videoId: "iACXRJc2iWk" },
  { id: "l6b", title: "المحاضرة السادسة — الجزء الثاني", videoId: "5j-XD0v705A" },
  { id: "l7", title: "المحاضرة السابعة", videoId: "oRVG_TP0wzI" },
  { id: "l8", title: "المحاضرة الثامنة", videoId: "1F0hJyu3tmc" },
  { id: "l9", title: "المحاضرة التاسعة", videoId: "b2WGDtRTpIc" },
];

const STORAGE_KEY = "shadowtrade_watched";

function getWatched() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function setWatched(watched) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(watched));
}

function loadLecture(lecture) {
  const player = document.getElementById("lecturePlayer");
  const title = document.getElementById("currentTitle");
  player.src = `https://www.youtube-nocookie.com/embed/${lecture.videoId}`;
  title.textContent = lecture.title;

  document.querySelectorAll(".lecture-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.id === lecture.id);
  });

  document.getElementById("markWatched").dataset.currentId = lecture.id;
  refreshWatchedButton(lecture.id);
}

function refreshWatchedButton(id) {
  const watched = getWatched();
  const btn = document.getElementById("markWatched");
  if (watched[id]) {
    btn.textContent = "✓ تمت المشاهدة";
    btn.classList.add("watched");
  } else {
    btn.textContent = 'وضع علامة "تمت المشاهدة"';
    btn.classList.remove("watched");
  }
}

function updateProgress() {
  const watched = getWatched();
  const total = LECTURES.length;
  const done = LECTURES.filter((l) => watched[l.id]).length;
  document.getElementById("progressFill").style.width = `${(done / total) * 100}%`;
  document.getElementById("progressText").textContent = `${done} من ${total} مكتملة`;
}

function renderList() {
  const list = document.getElementById("lectureList");
  const watched = getWatched();

  LECTURES.forEach((lecture, index) => {
    const item = document.createElement("button");
    item.className = "lecture-item";
    item.dataset.id = lecture.id;
    item.innerHTML = `
      <span class="lecture-num">${index + 1}</span>
      <span class="lecture-title">${lecture.title}</span>
      <span class="lecture-check">${watched[lecture.id] ? "✓" : ""}</span>
    `;
    item.addEventListener("click", () => loadLecture(lecture));
    list.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderList();
  loadLecture(LECTURES[0]);
  updateProgress();

  document.getElementById("markWatched").addEventListener("click", (e) => {
    const id = e.target.dataset.currentId;
    const watched = getWatched();
    watched[id] = !watched[id];
    setWatched(watched);
    refreshWatchedButton(id);
    updateProgress();
    document
      .querySelector(`.lecture-item[data-id="${id}"] .lecture-check`)
      .textContent = watched[id] ? "✓" : "";
  });
});
