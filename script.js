document.addEventListener("DOMContentLoaded", () => {
  // --- PARTICLE.JS & INTERACTIVITY INITIALIZATION ---

  // Initialize particles.js
  particlesJS("particles-js", {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: "#3fb950" }, // Updated to match green accent
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
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 1 } },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });

  // Cursor glow effect
  const cursorGlow = document.getElementById("cursor-glow");
  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  });

  // --- PAGE CONTENT SCRIPT ---
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const greetingElement = document.getElementById("greeting");
  const currentTimeElement = document.getElementById("current-time");
  const currentYearElement = document.getElementById("current-year");

  // 1. Search Functionality - NEW, MORE ROBUST LOGIC
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (!query) {
      return; // Do nothing if the search is empty
    }

    // Determine if the query is a URL or a search term.
    // It's considered a URL if it contains a '.' (like example.com) and has no spaces,
    // OR if it's exactly 'localhost'.
    const isUrl =
      (query.includes(".") && !query.includes(" ")) ||
      query.toLowerCase() === "localhost";

    if (isUrl) {
      // If it's a URL, navigate to it.
      // Add 'https://' if the protocol is missing.
      const destination =
        query.startsWith("http://") || query.startsWith("https://")
          ? query
          : `https://${query}`;
      window.location.href = destination;
    } else {
      // Otherwise, perform a Google search.
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.location.href = googleSearchUrl;
    }
  });

  // 2. Dynamic Greeting and Time
  function updateTimeAndGreeting() {
    const now = new Date();
    const hours = now.getHours();

    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    currentTimeElement.textContent = timeString;

    let greetingText;
    if (hours < 12) {
      greetingText = "Good Morning";
    } else if (hours < 18) {
      greetingText = "Good Afternoon";
    } else {
      greetingText = "Good Evening";
    }
    greetingElement.textContent = greetingText;
  }

  // 3. Update Current Year in Footer
  function updateYear() {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Initial calls
  updateTimeAndGreeting();
  updateYear();

  // Update time every second
  setInterval(updateTimeAndGreeting, 1000);
});
