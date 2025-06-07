document.addEventListener("DOMContentLoaded", () => {
  // --- PARTICLE.JS & INTERACTIVITY INITIALIZATION ---

  // Initialize particles.js
  particlesJS("particles-js", {
    particles: {
      number: {
        // Reduced particle count for better mobile performance
        value: 40,
        density: { enable: true, value_area: 800 },
      },
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
        // Disabled hover interactivity and enabled click/tap interactivity
        onhover: { enable: false, mode: "grab" },
        onclick: { enable: true, mode: "bubble" },
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 1 } },
        // Configuration for the bubble effect on tap
        bubble: { distance: 200, size: 8, duration: 2, opacity: 0.8, speed: 3 },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });

  // --- PAGE CONTENT SCRIPT ---
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const greetingElement = document.getElementById("greeting");
  const currentTimeElement = document.getElementById("current-time");
  const currentYearElement = document.getElementById("current-year");

  // 1. Search Functionality - Robust Logic
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (!query) {
      return; // Do nothing if the search is empty
    }

    const isUrl =
      (query.includes(".") && !query.includes(" ")) ||
      query.toLowerCase() === "localhost";

    if (isUrl) {
      const destination =
        query.startsWith("http://") || query.startsWith("https://")
          ? query
          : `https://${query}`;
      window.location.href = destination;
    } else {
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
    if (currentYearElement) {
      // Check if the element exists before trying to update it
      currentYearElement.textContent = new Date().getFullYear();
    }
  }

  // Initial calls
  updateTimeAndGreeting();
  updateYear();

  // Update time every second
  setInterval(updateTimeAndGreeting, 1000);
});
