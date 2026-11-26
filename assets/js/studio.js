/* ==========================================================================
   SixthSenseMusic — Interactive Studio Logic
   Zero dependencies, accessible, static-host friendly.
   ========================================================================== */

(() => {
  "use strict";

  /* ---------- Catalogue Data (Authentic Studio Releases) ---------- */
  const RELEASES = {
    "never-too-late": {
      catalogId: "SSM-001",
      title: "Never Too Late",
      artist: "OhMyJosh",
      role: "Production · Vocal Tracking · Mix",
      producer: "Chubbi",
      year: "Single Release",
      art: "images/never.jpg",
      profile: "Warm atmospheric pad textures, intimate lead vocal presence, and unhurried dynamic headroom.",
      credits: [
        ["Primary Artist", "OhMyJosh"],
        ["Producer", "Chubbi Stephen"],
        ["Recorded At", "SixthSenseMusic Studios"],
        ["Sonic Focus", "Vocal intimacy & spatial warmth"]
      ]
    },
    "dreams-come-alive": {
      catalogId: "SSM-002",
      title: "Dreams Come Alive",
      artist: "OhMyJosh",
      role: "Production · Live Keys · Arrangement",
      producer: "Chubbi",
      year: "Single Release",
      art: "images/dreams.jpg",
      profile: "Melodic songwriting anchored by expressive piano phrasing and tight low-end punch.",
      credits: [
        ["Primary Artist", "OhMyJosh"],
        ["Producer", "Chubbi Stephen"],
        ["Recorded At", "SixthSenseMusic Studios"],
        ["Sonic Focus", "Songwriting, keys & rhythmic drive"]
      ]
    },
    "its-your-worship": {
      catalogId: "SSM-003",
      title: "It's Your Worship",
      artist: "Blessed Chika ft. Kingdom Rowland",
      role: "Full Production · Vocal Direction · Mix",
      producer: "OhMyJosh",
      year: "Single Release",
      art: "images/chika.jpg",
      profile: "Lush duet vocal layering, expansive church-hall ambience, and disciplined orchestral midrange.",
      credits: [
        ["Artists", "Blessed Chika ft. Kingdom Rowland"],
        ["Producer", "OhMyJosh (Ataobor Joshua)"],
        ["Vocal Direction", "SixthSenseMusic"],
        ["Sonic Focus", "Duet harmonies & live worship dynamics"]
      ]
    },
    "changed": {
      catalogId: "SSM-004",
      title: "Changed",
      artist: "Precious Stones",
      role: "Writing · Arrangement · Mix & Master",
      producer: "OhMyJosh",
      year: "Single Release",
      art: "images/changed.jpg",
      profile: "Full ensemble arrangement combining live bass, keyboards, and layered group harmonies.",
      credits: [
        ["Ensemble", "Precious Stones"],
        ["Written & Arranged", "OMJ (OhMyJosh)"],
        ["Lead Vocals", "OMJ & Ezinne"],
        ["Keys & Bass", "IzzyKeys · Joel Brown"],
        ["Background Vocals", "Gift, Onyinye, Ezinne & OMJ"],
        ["Mixed & Mastered", "OMJ at SixthSenseMusic"]
      ]
    }
  };

  /* ---------- 1. Sticky Header & Mobile Drawer ---------- */
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".mobile-drawer");

  if (header && !header.classList.contains("is-solid")) {
    const syncHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 28);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  if (navToggle && drawer) {
    const setDrawer = (open) => {
      navToggle.setAttribute("aria-expanded", String(open));
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
    };

    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") !== "true";
      setDrawer(open);
    });

    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setDrawer(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) {
        setDrawer(false);
      }
    });
  }

  /* ---------- 2. Scroll Reveal ---------- */
  const reveals = document.querySelectorAll("[data-reveal]");
  if (reveals.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 3. Catalogue Dossier Modal ---------- */
  const modalBackdrop = document.getElementById("release-modal");
  if (modalBackdrop) {
    const modalClose = modalBackdrop.querySelector(".modal__close");
    const artImg = modalBackdrop.querySelector("[data-modal-art]");
    const catEl = modalBackdrop.querySelector("[data-modal-cat]");
    const titleEl = modalBackdrop.querySelector("[data-modal-title]");
    const artistEl = modalBackdrop.querySelector("[data-modal-artist]");
    const profileEl = modalBackdrop.querySelector("[data-modal-profile]");
    const creditsEl = modalBackdrop.querySelector("[data-modal-credits]");
    const bookLink = modalBackdrop.querySelector("[data-modal-book]");

    const openRelease = (id) => {
      const item = RELEASES[id];
      if (!item) return;

      artImg.src = item.art;
      artImg.alt = `${item.title} — ${item.artist}`;
      catEl.textContent = `${item.catalogId} · ${item.role}`;
      titleEl.textContent = item.title;
      artistEl.textContent = `${item.artist} — Produced by ${item.producer}`;
      profileEl.textContent = item.profile;

      creditsEl.innerHTML = item.credits
        .map(
          ([k, v]) =>
            `<div class="credits-list__row"><span>${k}</span><span>${v}</span></div>`
        )
        .join("");

      if (bookLink) {
        bookLink.href = `book.html?reference=${encodeURIComponent(item.title)}#booking-form`;
      }

      modalBackdrop.classList.add("is-open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      modalBackdrop.classList.remove("is-open");
      modalBackdrop.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    document.querySelectorAll("[data-release-id]").forEach((trigger) => {
      trigger.addEventListener("click", () => openRelease(trigger.dataset.releaseId));
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  /* ---------- 4. Interactive Signal-Chain Reference (Web Audio API) ---------- */
  const consoleRoot = document.querySelector("[data-signal-console]");
  if (consoleRoot) {
    const playBtn = consoleRoot.querySelector("[data-console-play]");
    const modeBtns = consoleRoot.querySelectorAll("[data-console-mode]");
    const meterPanel = consoleRoot.querySelector(".meter-panel");
    const bars = Array.from(consoleRoot.querySelectorAll(".meter-bar"));
    const lufsOut = consoleRoot.querySelector("[data-readout-lufs]");
    const headroomOut = consoleRoot.querySelector("[data-readout-headroom]");
    const stageOut = consoleRoot.querySelector("[data-readout-stage]");

    let ctx = null;
    let isPlaying = false;
    let mode = "mastered";
    let timerId = null;
    let chordTimerId = null;
    let activeNodes = [];
    let chain = null;

    const CHORDS = [
      [146.83, 220.0, 261.63, 329.63, 392.0], // Dm9
      [130.81, 196.0, 246.94, 293.66, 329.63], // Cmaj9
      [174.61, 220.0, 261.63, 329.63, 392.0], // Fmaj9
      [196.0, 246.94, 293.66, 349.23, 440.0]  // G13
    ];
    let chordIndex = 0;

    const updateReadout = () => {
      if (mode === "mastered") {
        stageOut.textContent = "Neve Bus + Tape + Limiter";
        lufsOut.textContent = isPlaying ? "-9.2 LUFS" : "-9.4 LUFS";
        headroomOut.textContent = "-1.0 dBTP";
      } else {
        stageOut.textContent = "Raw Tracking (Bypass)";
        lufsOut.textContent = isPlaying ? "-17.8 LUFS" : "-18.0 LUFS";
        headroomOut.textContent = "-6.4 dBTP";
      }
    };

    const ensureAudioChain = () => {
      if (ctx) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioCtx();

      const preFilter = ctx.createBiquadFilter();
      preFilter.type = "lowpass";
      preFilter.frequency.value = 3400;

      const airShelf = ctx.createBiquadFilter();
      airShelf.type = "highshelf";
      airShelf.frequency.value = 4200;
      airShelf.gain.value = 5.5;

      const lowWarmth = ctx.createBiquadFilter();
      lowWarmth.type = "lowshelf";
      lowWarmth.frequency.value = 140;
      lowWarmth.gain.value = 3.2;

      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -22;
      comp.ratio.value = 3.5;
      comp.attack.value = 0.015;
      comp.release.value = 0.18;

      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.24;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;

      preFilter.connect(lowWarmth);
      lowWarmth.connect(airShelf);
      airShelf.connect(comp);
      comp.connect(masterGain);
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);

      chain = { preFilter, airShelf, lowWarmth, comp, masterGain, analyser };
      applyModeParams();
    };

    const applyModeParams = () => {
      if (!ctx || !chain) return;
      const now = ctx.currentTime;
      if (mode === "mastered") {
        chain.preFilter.frequency.setTargetAtTime(6200, now, 0.08);
        chain.airShelf.gain.setTargetAtTime(5.5, now, 0.08);
        chain.lowWarmth.gain.setTargetAtTime(3.2, now, 0.08);
        chain.masterGain.gain.setTargetAtTime(0.28, now, 0.08);
      } else {
        chain.preFilter.frequency.setTargetAtTime(2100, now, 0.08);
        chain.airShelf.gain.setTargetAtTime(-2.5, now, 0.08);
        chain.lowWarmth.gain.setTargetAtTime(0, now, 0.08);
        chain.masterGain.gain.setTargetAtTime(0.14, now, 0.08);
      }
    };

    const triggerChord = () => {
      if (!ctx || !isPlaying) return;
      const freqs = CHORDS[chordIndex % CHORDS.length];
      chordIndex += 1;
      const now = ctx.currentTime;

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = idx === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(f, now);

        env.gain.setValueAtTime(0.0001, now);
        env.gain.exponentialRampToValueAtTime(0.085 / freqs.length * 3, now + 0.06);
        env.gain.exponentialRampToValueAtTime(0.0008, now + 2.3);

        osc.connect(env);
        env.connect(chain.preFilter);
        osc.start(now);
        osc.stop(now + 2.35);
        activeNodes.push(osc);
      });
    };

    const animateMeters = () => {
      if (!isPlaying || !chain) return;
      const data = new Uint8Array(chain.analyser.frequencyBinCount);
      chain.analyser.getByteFrequencyData(data);
      const scale = mode === "mastered" ? 1.15 : 0.72;
      bars.forEach((bar, i) => {
        const val = data[i % data.length] || 18;
        const pct = Math.min(96, Math.max(12, Math.round((val / 255) * 100 * scale)));
        bar.style.height = `${pct}%`;
      });
      timerId = requestAnimationFrame(animateMeters);
    };

    const stopConsole = () => {
      isPlaying = false;
      clearInterval(chordTimerId);
      cancelAnimationFrame(timerId);
      activeNodes.forEach((n) => {
        try { n.stop(); } catch (_) {}
      });
      activeNodes = [];
      playBtn.textContent = "Audition Reference Tone";
      meterPanel.classList.remove("is-playing");
      bars.forEach((b) => { b.style.height = "16%"; });
      updateReadout();
    };

    const startConsole = async () => {
      ensureAudioChain();
      if (ctx.state === "suspended") await ctx.resume();
      isPlaying = true;
      playBtn.textContent = "Stop Reference";
      meterPanel.classList.add("is-playing");
      updateReadout();
      triggerChord();
      chordTimerId = setInterval(triggerChord, 2200);
      animateMeters();
    };

    playBtn.addEventListener("click", () => {
      if (isPlaying) stopConsole();
      else startConsole();
    });

    modeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        mode = btn.dataset.consoleMode;
        modeBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
        applyModeParams();
        updateReadout();
      });
    });

    updateReadout();
  }

  /* ---------- 5. Gear Locker Filter (Studios Page) ---------- */
  const gearSection = document.querySelector("[data-gear-locker]");
  if (gearSection) {
    const tabs = gearSection.querySelectorAll("[data-gear-filter]");
    const rows = gearSection.querySelectorAll("[data-gear-cat]");
    const countEl = gearSection.querySelector("[data-gear-count]");

    const applyGearFilter = (cat) => {
      let visible = 0;
      rows.forEach((row) => {
        const match = cat === "all" || row.dataset.gearCat === cat;
        row.classList.toggle("is-hidden", !match);
        if (match) visible += 1;
      });
      if (countEl) {
        countEl.textContent = `${visible} ${visible === 1 ? "unit" : "units"} shown`;
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
        applyGearFilter(tab.dataset.gearFilter);
      });
    });

    applyGearFilter("all");
  }

  /* ---------- 5b. Catalogue Producer Filter (Catalogue Page) ---------- */
  const catalogueSection = document.querySelector("[data-catalogue]");
  if (catalogueSection) {
    const catTabs = catalogueSection.querySelectorAll("[data-cat-filter]");
    const cards = catalogueSection.querySelectorAll("[data-producer]");

    catTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.dataset.catFilter;
        catTabs.forEach((t) => t.classList.toggle("is-active", t === tab));
        cards.forEach((card) => {
          const match = filter === "all" || card.dataset.producer === filter;
          card.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* ---------- 6. Interactive Session Estimator (Services Page) ---------- */
  const estimator = document.querySelector("[data-estimator]");
  if (estimator) {
    const serviceTiles = estimator.querySelectorAll("[data-est-service]");
    const currencyBtns = estimator.querySelectorAll("[data-est-currency]");
    const qtyInput = estimator.querySelector("#est-qty");
    const qtyLabel = estimator.querySelector("[data-est-qty-label]");
    const qtyValue = estimator.querySelector("[data-est-qty-value]");
    const addonChecks = estimator.querySelectorAll("[data-est-addon]");

    const lineService = estimator.querySelector("[data-sum-service]");
    const lineBase = estimator.querySelector("[data-sum-base]");
    const lineAddons = estimator.querySelector("[data-sum-addons]");
    const totalEl = estimator.querySelector("[data-sum-total]");
    const carryBtn = estimator.querySelector("[data-est-carry]");

    const RATES = {
      tracking: { label: "Studio Recording & Tracking", unit: "hours", min: 2, max: 16, step: 2, def: 4, ngn: 35000, usd: 45 },
      production: { label: "Full Music Production", unit: "tracks", min: 1, max: 10, step: 1, def: 1, ngn: 280000, usd: 350 },
      mixing: { label: "Analog-Hybrid Mixing", unit: "tracks", min: 1, max: 12, step: 1, def: 2, ngn: 140000, usd: 180 },
      mastering: { label: "Mastering & Release Prep", unit: "tracks", min: 1, max: 14, step: 1, def: 2, ngn: 55000, usd: 75 }
    };

    let selectedService = "tracking";
    let currency = "NGN";

    const fmt = (ngnAmount, usdAmount) => {
      if (currency === "USD") {
        return `$${usdAmount.toLocaleString("en-US")}`;
      }
      return `₦${ngnAmount.toLocaleString("en-NG")}`;
    };

    const syncSliderRange = () => {
      const cfg = RATES[selectedService];
      qtyInput.min = cfg.min;
      qtyInput.max = cfg.max;
      qtyInput.step = cfg.step;
      qtyInput.value = cfg.def;
      qtyLabel.textContent = cfg.unit === "hours" ? "Session Duration (Hours)" : "Project Scope (Tracks)";
    };

    const recalculate = () => {
      const cfg = RATES[selectedService];
      const qty = Number(qtyInput.value);
      qtyValue.textContent = `${qty} ${cfg.unit}`;

      const baseNgn = cfg.ngn * qty;
      const baseUsd = cfg.usd * qty;

      let addonNgn = 0;
      let addonUsd = 0;
      const pickedAddons = [];
      addonChecks.forEach((cb) => {
        if (cb.checked) {
          addonNgn += Number(cb.dataset.ngn || 0);
          addonUsd += Number(cb.dataset.usd || 0);
          pickedAddons.push(cb.dataset.label);
        }
      });

      const totalNgn = baseNgn + addonNgn;
      const totalUsd = baseUsd + addonUsd;

      lineService.textContent = `${cfg.label} (${qty} ${cfg.unit})`;
      lineBase.textContent = fmt(baseNgn, baseUsd);
      lineAddons.textContent = pickedAddons.length ? fmt(addonNgn, addonUsd) : "None selected";
      totalEl.textContent = fmt(totalNgn, totalUsd);

      const summaryText = `${cfg.label} · ${qty} ${cfg.unit}${pickedAddons.length ? " · Add-ons: " + pickedAddons.join(", ") : ""} · Est. ${fmt(totalNgn, totalUsd)}`;
      carryBtn.href = `book.html?service=${encodeURIComponent(selectedService)}&scope=${encodeURIComponent(summaryText)}#booking-form`;
    };

    serviceTiles.forEach((tile) => {
      tile.addEventListener("click", () => {
        selectedService = tile.dataset.estService;
        serviceTiles.forEach((t) => t.classList.toggle("is-selected", t === tile));
        syncSliderRange();
        recalculate();
      });
    });

    currencyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        currency = btn.dataset.estCurrency;
        currencyBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
        recalculate();
      });
    });

    qtyInput.addEventListener("input", recalculate);
    addonChecks.forEach((cb) => cb.addEventListener("change", recalculate));

    syncSliderRange();
    recalculate();
  }

  /* ---------- 7. Smart Booking Concierge (Book Page) ---------- */
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    const params = new URLSearchParams(window.location.search);
    const serviceField = bookingForm.querySelector("#bk-service");
    const notesField = bookingForm.querySelector("#bk-notes");
    const statusBox = document.getElementById("booking-status");
    const copyBtn = document.getElementById("copy-brief-btn");

    const preService = params.get("service");
    const preScope = params.get("scope");
    const preRef = params.get("reference");

    if (preService && serviceField) {
      const map = {
        tracking: "Studio Recording & Tracking",
        production: "Full Music Production",
        mixing: "Analog-Hybrid Mixing",
        mastering: "Mastering & Release Prep"
      };
      if (map[preService]) serviceField.value = map[preService];
    }

    if (notesField) {
      const lines = [];
      if (preScope) lines.push(`Estimator Brief: ${preScope}`);
      if (preRef) lines.push(`Sonic Reference from Catalogue: "${preRef}"`);
      if (lines.length) notesField.value = lines.join("\n") + "\n\nProject details: ";
    }

    const buildBrief = () => {
      const data = new FormData(bookingForm);
      return [
        "SIXTHSENSEMUSIC — STUDIO SESSION REQUEST",
        "----------------------------------------",
        `Client / Artist: ${data.get("name") || "—"}`,
        `Email: ${data.get("email") || "—"}`,
        `Phone / WhatsApp: ${data.get("phone") || "—"}`,
        `Discipline: ${data.get("service") || "—"}`,
        `Preferred Room: ${data.get("room") || "—"}`,
        `Target Date & Block: ${data.get("date") || "Flexible"} (${data.get("block") || "—"})`,
        `Demo / Reference Link: ${data.get("demo") || "None provided"}`,
        "",
        "Project Notes:",
        data.get("notes") || "—"
      ].join("\n");
    };

    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const brief = buildBrief();
      const name = bookingForm.querySelector("#bk-name").value.trim() || "Artist";
      const service = bookingForm.querySelector("#bk-service").value;
      const subject = encodeURIComponent(`Session Inquiry: ${service} — ${name}`);
      const body = encodeURIComponent(brief);

      if (statusBox) {
        statusBox.hidden = false;
        statusBox.innerHTML = `
          <strong>Session brief prepared.</strong> Your email client will open to dispatch directly to
          <a href="mailto:joshrexly@gmail.com?subject=${subject}&body=${body}" class="text-link">joshrexly@gmail.com</a>.
          You may also copy your formatted brief below.
        `;
      }
      window.location.href = `mailto:joshrexly@gmail.com?subject=${subject}&body=${body}`;
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const brief = buildBrief();
        try {
          await navigator.clipboard.writeText(brief);
          const orig = copyBtn.textContent;
          copyBtn.textContent = "Brief Copied";
          setTimeout(() => { copyBtn.textContent = orig; }, 2200);
        } catch (_) {
          if (statusBox) {
            statusBox.hidden = false;
            statusBox.textContent = "Clipboard access unavailable—please submit to open your email client.";
          }
        }
      });
    }
  }
})();
