# MeBoard - My Personal Interactive Startpage

A sleek, modern, and highly interactive startpage to replace the browser's new tab page.

---

### 🚀 Live Version

You can see it live right here: **[https://Spn4x.github.io/MeDashboard/](https://Spn4x.github.io/MeDashboard/)**

---

### ✨ Features

-   **Unified Design:** A consistent "Living Background" experience on both desktop and mobile.
-   **Dynamic Greeting & Time:** Welcomes you with a time-appropriate greeting and a live clock.
-   **Interactive Particle Background:** An animated background powered by `particles.js`. Tapping the background on mobile creates a "bubble" effect.
-   **Touch-Native Mobile UI:** A clean, non-scrolling mobile interface with `:active` states for satisfying tactile feedback on taps.
-   **Smart Search:** Automatically knows whether to search Google or navigate to a URL.
-   **Sleek Dark Theme:** A clean, developer-focused dark theme.

---

### 🔧 Make It Your Own

Customizing MeBoard is straightforward. All the main settings are in the project files.

#### 1. Edit Quick Links
Open `index.html` and find the `div` with the class `links-grid`. You can change the link `href`, the Font Awesome icon, and the text for each button.

```html
<!-- Example of a link item -->
<a href="https://www.reddit.com" target="_blank" class="link-item">
    <i class="fa-brands fa-reddit-alien"></i> <!-- Change icon class here -->
    <span>Reddit</span> <!-- Change display name here -->
</a>
