document.addEventListener("DOMContentLoaded", () => {
  // --- PARTICLE.JS INITIALIZATION ---
  particlesJS("particles-js", {
    particles: {
      number: { value: 40, density: { enable: true, value_area: 800 } },
      color: { value: "#58a6ff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#8b949e",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "bubble" },
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 1 } },
        bubble: { distance: 200, size: 8, duration: 2, opacity: 0.8, speed: 3 },
      },
    },
    retina_detect: true,
  });

  // --- UNIVERSAL ELEMENTS ---
  const body = document.body;
  const overlay = document.getElementById("overlay");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const mainHeader = document.querySelector(".main-header");

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // --- 3D TILT EFFECT FOR DESKTOP HEADER ---
  if (!isMobile) {
    mainHeader.addEventListener("mousemove", (e) => {
      const rect = mainHeader.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -y / 25; // Less sensitive tilt
      const rotateY = x / 25;
      mainHeader.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    mainHeader.addEventListener("mouseleave", () => {
      mainHeader.style.transform = "rotateX(0) rotateY(0)";
    });
  }

  if (isMobile) {
    // --- MOBILE: GESTURAL DRAWER LOGIC ---
    const appDrawer = document.getElementById("app-drawer");
    const mainContent = document.querySelector(".main-content");
    const changelogTriggerMobile = document.getElementById(
      "changelog-trigger-mobile",
    );
    const changelogCurtain = document.getElementById("changelog-curtain");
    const changelogCloseBtn = document.getElementById("changelog-close-btn");
    let startY = 0,
      startTime = 0;
    const SWIPE_THRESHOLD = 50,
      SWIPE_TIME_LIMIT = 500;
    const openAppDrawer = () => {
      closeChangelog();
      body.classList.add("drawer-open");
    };
    const closeAppDrawer = () => body.classList.remove("drawer-open");
    const openChangelog = () => {
      closeAppDrawer();
      body.classList.add("changelog-open");
    };
    const closeChangelog = () => body.classList.remove("changelog-open");
    const swipeStart = (e) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };
    const swipeEnd = (e) => {
      const deltaY = startY - e.changedTouches[0].clientY;
      if (
        Math.abs(deltaY) > SWIPE_THRESHOLD &&
        Date.now() - startTime < SWIPE_TIME_LIMIT
      ) {
        if (
          deltaY > 0 &&
          !body.classList.contains("drawer-open") &&
          !body.classList.contains("changelog-open")
        )
          openAppDrawer();
        else if (deltaY < 0 && body.classList.contains("drawer-open"))
          closeAppDrawer();
      }
    };
    mainContent.addEventListener("touchstart", swipeStart, { passive: true });
    mainContent.addEventListener("touchend", swipeEnd, { passive: true });
    appDrawer.addEventListener("touchstart", swipeStart, { passive: true });
    appDrawer.addEventListener("touchend", swipeEnd, { passive: true });
    changelogTriggerMobile.addEventListener("click", openChangelog);
    changelogCloseBtn.addEventListener("click", closeChangelog);
    overlay.addEventListener("click", () => {
      closeAppDrawer();
      closeChangelog();
    });
  } else {
    // --- DESKTOP: DUAL DRAWERS & KEYBOARD NAVIGATION ---
    const curtainTrigger = document.getElementById("drawer-trigger-desktop");
    const curtainCloseBtn = document.getElementById("curtain-close-btn");
    const changelogTrigger = document.getElementById(
      "changelog-trigger-desktop",
    );
    const changelogCloseBtn = document.getElementById("changelog-close-btn");
    const openCurtain = () => {
      closeChangelog();
      body.classList.add("curtain-open");
    };
    const closeCurtain = () => body.classList.remove("curtain-open");
    const openChangelog = () => {
      closeCurtain();
      body.classList.add("changelog-open");
    };
    const closeChangelog = () => body.classList.remove("changelog-open");
    curtainTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      openCurtain();
    });
    curtainCloseBtn.addEventListener("click", closeCurtain);
    changelogTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      openChangelog();
    });
    changelogCloseBtn.addEventListener("click", closeChangelog);
    overlay.addEventListener("click", () => {
      closeCurtain();
      closeChangelog();
    });
    const navigables = [
      curtainTrigger,
      searchForm,
      changelogTrigger,
      curtainCloseBtn,
      ...document.querySelectorAll("#curtain-menu .link-item"),
    ];
    let focusedIndex = -1;
    const updateFocus = () => {
      navigables.forEach((el, i) => {
        const hasFocus = i === focusedIndex;
        el.classList.toggle("kb-focus", hasFocus);
        if (hasFocus) {
          if (el === searchForm) {
            searchInput.focus();
          } else {
            el.focus();
          }
        }
      });
    };
    document.addEventListener("keydown", (e) => {
      const isCurtainOpen = body.classList.contains("curtain-open");
      const isChangelogOpen = body.classList.contains("changelog-open");
      if (e.key === "Escape") {
        if (isCurtainOpen) {
          closeCurtain();
          return;
        }
        if (isChangelogOpen) {
          closeChangelog();
          return;
        }
        if (document.activeElement === searchInput) {
          searchInput.blur();
          focusedIndex = 1;
          updateFocus();
          return;
        }
      }
      if (document.activeElement === searchInput && e.key.length === 1) {
        return;
      }
      let offset = 0;
      const keyMap = {
        ArrowDown: 1,
        ArrowUp: -1,
        ArrowRight: 1,
        ArrowLeft: -1,
      };
      if (isCurtainOpen) {
        keyMap.ArrowDown = 3;
        keyMap.ArrowUp = -3;
      }
      if (keyMap[e.key]) {
        e.preventDefault();
        offset = keyMap[e.key];
        let start = 0,
          end = 2;
        if (isCurtainOpen) {
          start = 3;
          end = navigables.length - 1;
        } else if (isChangelogOpen) {
          return;
        }
        if (focusedIndex < start || focusedIndex > end) {
          focusedIndex = start;
        } else {
          focusedIndex += offset;
        }
        if (focusedIndex > end) focusedIndex = start;
        if (focusedIndex < start) focusedIndex = end;
        updateFocus();
      } else if (e.key === "Enter" && focusedIndex > -1) {
        e.preventDefault();
        navigables[focusedIndex].dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
        navigables[focusedIndex].click();
      }
    });
  }

  // --- MAIN UPDATE LOGIC ---
  const greetingElement = document.getElementById("greeting");
  const currentTimeElement = document.getElementById("current-time");
  const currentDateElement = document.getElementById("current-date");
  const mealIndicator = document.getElementById("meal-indicator");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;
    const isUrl =
      (query.includes(".") && !query.includes(" ")) ||
      query.toLowerCase() === "localhost";
    if (isUrl) {
      const dest = query.startsWith("http") ? query : `https://${query}`;
      window.location.href = dest;
    } else {
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.location.href = url;
    }
  });

  function updateLiveElements() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    currentTimeElement.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateOptions = { weekday: "long", month: "long", day: "numeric" };
    currentDateElement.textContent = now.toLocaleDateString(
      undefined,
      dateOptions,
    );
    let greetingText = "Good Evening";
    if (hours >= 8 && hours < 11) {
      greetingText = "Good Morning";
    } else if (hours >= 11 && hours < 14) {
      greetingText = "Good Afternoon";
    } else if (hours < 12) {
      greetingText = "Good Morning";
    } else if (hours < 18) {
      greetingText = "Good Afternoon";
    }
    greetingElement.textContent = greetingText;
    let mealText = "";
    if (hours >= 8 && hours < 11) mealText = "🍳 Breakfast Time";
    else if (hours >= 11 && hours < 14) mealText = "🥪 Lunch Time";
    else if ((hours >= 19 && hours < 21) || (hours === 21 && minutes <= 30))
      mealText = "🍕 Dinner Time";
    if (mealText) {
      mealIndicator.textContent = mealText;
      mealIndicator.classList.add("visible");
    } else {
      mealIndicator.classList.remove("visible");
    }
  }

  updateLiveElements();
  setInterval(updateLiveElements, 1000);
});
