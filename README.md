# MeBoard - The Definitive Edition

A definitive, experiential startpage designed to replace your browser's new tab. This project has evolved into a polished application featuring two distinct, premium user interfaces for desktop and mobile, packed with satisfying animations and thoughtful interactions.


---

### 🚀 Live Version

You can see it live right here: **[https://Spn4x.github.io/MeDashboard/](https://Spn4x.github.io/MeDashboard/)**

---

### ✨ Features

This project provides two unique, platform-specific experiences:

#### Desktop Experience: "The Living Node Grid"
-   **Floating Triggers:** Elegant "App Drawer" and "Changelogs" buttons float at the top and bottom center, providing clean access points.
-   **Dynamic Drawer:** The menu intelligently resizes its width to perfectly frame the quick links, creating a clean, floating panel.
-   **"Aurora Borealis" Focus:** When navigating with keys, focused items are encircled by a beautiful, shimmering animated gradient border.
-   **"Impact Ripple" Arrival:** When a new link receives focus, it emits a satisfying shockwave of light.
-   **Full Keyboard Accessibility:** The entire interface, including triggers, search, and all menu links, is seamlessly navigable with arrow keys.

#### Mobile Experience: "The Gestural UI"
-   **Stable Layout:** The main content is perfectly positioned to ensure the search bar is always visible when the mobile keyboard appears, with no jarring layout shifts.
-   **"Flick-to-Toggle" App Drawer:** A quick, intuitive swipe-up gesture on the main screen toggles the app drawer open from the bottom. A swipe-down closes it.
-   **Consistent "Glassmorphism" Design:** The mobile app drawer and changelog menu now share the same beautiful, semi-transparent blurry background as their desktop counterparts.
-   **Enriched Interface:** The interactive particle background and a full, formatted date have been added to the mobile view, creating a richer and more complete experience.

#### Shared Features
-   **Meal-Time Indicator:** A subtle status indicator appears in the top-left corner during breakfast, lunch, and dinner times.
-   **Synced Greetings:** The main greeting ("Good Morning," etc.) is always logically consistent with the current meal-time status.
-   **Changelogs:** A built-in, hard-coded changelog drawer to track the project's evolution.

---

### 🔧 Make It Your Own

Customizing MeBoard is straightforward. All the main settings are in the project files.

#### 1. Edit Quick Links
Open `index.html`. You will need to edit the links in two places: once inside the `div#curtain-menu` for the desktop view, and again inside the `div#app-drawer` for the mobile view.

```html
<!-- Example of a link item -->
<a href="https://www.reddit.com" target="_blank" class="link-item">
    <i class="fa-brands fa-reddit-alien"></i> <!-- Change icon class here -->
    <span>Reddit</span> <!-- Change display name here -->
</a>
```

#### 2. Change Theme Colors
Open `style.css` and edit the variables inside the `:root` block at the top. This is the easiest way to change the entire color scheme.

```css
:root {
    --bg-color: #0d1117;
    --panel-color: #161b22;
    --accent-color: #58a6ff; /* This is the main highlight color */
}
```

#### 3. Update Changelogs
Open `index.html` and find the `<ul class="changelog-list">`. You can add, edit, or remove the `<li>` items to match your own project history.

```html
<!-- Example of a changelog item -->
<li>
    <h3>Version 4.0 - The Final Polish</h3>
    <span class="changelog-date">June 9, 2025</span>
    <p>- My custom description of the changes I made.</p>
</li>
```

---

### Technology Stack
-   HTML5
-   CSS3 (with advanced animations and CSS Variables)
-   Vanilla JavaScript (with platform-aware interaction logic)
-   [particles.js](https://github.com/VincentGarreau/particles.js/)
-   [Font Awesome](https://fontawesome.com/)
