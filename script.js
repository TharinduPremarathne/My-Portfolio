// Helpers
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];

/* =========================
   Theme Toggle (Dark/Light)
========================= */
const themeToggle = $("#themeToggle");
const themeIcon = $("#themeIcon");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeIcon.textContent = theme === "light" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme || "dark");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* =========================
   Mobile Nav Toggle
========================= */
const navToggle = $("#navToggle");
const navList = $("#navList");

navToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu on link click
$$(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    navList.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================
   Scroll Progress Bar
========================= */
const progress = $("#progress");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progress.style.width = `${pct}%`;
});

/* =========================
   Active Nav Link (ScrollSpy)
========================= */
const sections = ["about", "skills", "projects", "experience", "contact"].map(id => document.getElementById(id));
const navLinks = $$(".nav__link");

function setActiveLink() {
  const y = window.scrollY + 120;
  let activeId = "about";

  for (const sec of sections) {
    if (sec.offsetTop <= y) activeId = sec.id;
  }

  navLinks.forEach(a => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("is-active", href === `#${activeId}`);
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

/* =========================
   Reveal on Scroll
========================= */
const revealEls = $$(".reveal");

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

/* =========================
   Count Up Stats
========================= */
const counters = $$(".stat__num");
let counted = false;

function countUp() {
  if (counted) return;
  const heroTop = document.querySelector(".hero").getBoundingClientRect().top;
  if (heroTop < window.innerHeight * 0.7) {
    counted = true;
    counters.forEach(el => {
      const target = Number(el.dataset.count || "0");
      let current = 0;
      const steps = 40;
      const inc = Math.max(1, Math.round(target / steps));

      const timer = setInterval(() => {
        current += inc;
        if (current >= target) {
          el.textContent = String(target);
          clearInterval(timer);
        } else {
          el.textContent = String(current);
        }
      }, 24);
    });
  }
}
window.addEventListener("scroll", countUp);
countUp();

/* =========================
   Project Filter
========================= */
const filterBtns = $$(".chipbtn");
const cards = $$(".project");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = filter === "all" || tags.includes(filter);
      card.style.display = show ? "" : "none";
    });
  });
});

/* =========================
   Project Modal (Click Card)
========================= */
const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalTech = $("#modalTech");
const modalDesc = $("#modalDesc");
const modalLive = $("#modalLive");
const modalCode = $("#modalCode");

let lastFocused = null;

function openModal(card) {
  lastFocused = document.activeElement;

  modalTitle.textContent = card.dataset.title || "Project";
  modalTech.textContent = card.dataset.tech || "";
  modalDesc.textContent = card.dataset.desc || "";

  let links = { live: "https://example.com", code: "https://github.com" };
  try {
    links = JSON.parse(card.dataset.links || "{}");
  } catch {}

  modalLive.href = links.live || "#";
  modalCode.href = links.code || "#";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  // focus close button for accessibility
  const closeBtn = modal.querySelector("[data-close]");
  closeBtn?.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  lastFocused?.focus?.();
}

cards.forEach(card => {
  card.addEventListener("click", () => openModal(card));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(card);
    }
  });
});

modal.addEventListener("click", (e) => {
  if (e.target.matches("[data-close]")) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

/* =========================
   Contact Form Validation
========================= */
const form = $("#contactForm");
const note = $("#formNote");

function setError(input, msg) {
  const field = input.closest(".field");
  const small = field.querySelector(".error");
  small.textContent = msg || "";
  input.setAttribute("aria-invalid", msg ? "true" : "false");
}

function validate() {
  let ok = true;

  const name = $("#name");
  const email = $("#email");
  const message = $("#message");

  // Name
  if (!name.value.trim() || name.value.trim().length < 2) {
    setError(name, "Please enter your name (min 2 characters).");
    ok = false;
  } else setError(name, "");

  // Email
  const emailVal = email.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  if (!emailOk) {
    setError(email, "Please enter a valid email address.");
    ok = false;
  } else setError(email, "");

  // Message
  if (!message.value.trim() || message.value.trim().length < 10) {
    setError(message, "Message should be at least 10 characters.");
    ok = false;
  } else setError(message, "");

  return ok;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  note.textContent = "";

  if (!validate()) return;

  // Demo success (front-end only)
  note.textContent = "✅ Thanks! Your message is validated and ready to send via your backend/email service.";
  form.reset();
});

/* =========================
   Footer Year
========================= */
$("#year").textContent = new Date().getFullYear();
