// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.hidden = isOpen;
  });

  // Close menu when clicking a link
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menuBtn.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    });
  });
}

// Grocery checklist persistence
const STORAGE_KEY = "mealprep_checklist_v1";
const checkboxes = Array.from(document.querySelectorAll(".item"));
const resetBtn = document.getElementById("resetBtn");

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const state = loadState();

checkboxes.forEach(cb => {
  const key = cb.dataset.key;
  if (key && state[key] === true) cb.checked = true;

  cb.addEventListener("change", () => {
    if (!key) return;
    state[key] = cb.checked;
    saveState(state);
  });
});

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    checkboxes.forEach(cb => (cb.checked = false));
    Object.keys(state).forEach(k => (state[k] = false));
    saveState(state);
  });
}

// Notes (demo list, not saved)
const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const notes = document.getElementById("notes");

if (noteForm && noteInput && notes) {
  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = noteInput.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    li.textContent = text;
    notes.appendChild(li);

    noteInput.value = "";
    noteInput.focus();
  });
}
