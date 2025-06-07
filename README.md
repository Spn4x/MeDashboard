# MeBoard - My Personal Interactive Startpage

A sleek, modern, and highly interactive startpage to replace the browser's new tab page.


---

### 🚀 Live Version

You can see it live right here: **https://Spn4x.github.io/MeDashboard/**

---

### ✨ Features

-   **Dynamic Greeting & Time:** Welcomes you with a time-appropriate greeting and a live clock.
-   **Interactive Particle Background:** An animated background powered by `particles.js`.
-   **Cursor Glow Effect:** A subtle light follows the cursor for a modern feel.
-   **Tactile "Keyboard" UI:** Quick links and the search bar visually "press down" on hover.
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
