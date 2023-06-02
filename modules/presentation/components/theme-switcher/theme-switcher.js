import { html, Oid, OidUI } from "/lib/oidlib-dev";

export class ThemeSwitcherOid extends OidUI {
  template() {
    return html`
      <link rel="stylesheet" href="./style.css" />
      <button type="button" @click class="p-2 rounded-md border border-input hover:bg-accent hover:text-accent-foreground transitions-color">
        ${document.body.classList.contains("dark")
        ? html`<svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-sun">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>`
        : html`<svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-moon">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>`}
      </button>
    `;
  }

  _onClick() {
    document.body.classList.toggle("dark");
    this.render();
  }
}

Oid.component({
  id: "presentation:theme-switcher",
  element: "theme-switcher-oid",
  implementation: ThemeSwitcherOid,
});
