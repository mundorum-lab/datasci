import { html, Oid, OidUI } from "/lib/oidlib-dev";

export class ApplicationOid extends OidUI {
  // presenting = false -> workflow
  // presenting = true -> presentation
  presenting = false;

  tabChanged() {
    const documentRef = this.constructor.spec.shadow
      ? this.shadowRoot
      : document;

    documentRef
      .getElementById("application-tabs--workflow-btn")
      ?.setAttribute("data-state", !this.presenting ? "active" : "");
    documentRef
      .getElementById("application-tabs--presentation-btn")
      ?.setAttribute("data-state", this.presenting ? "active" : "");

    if (this.presenting) {
      documentRef.getElementById("workflow-container").style.display = "none";
      documentRef.getElementById("presentation-container").style.display =
        "block";
    } else {
      documentRef.getElementById("workflow-container").style.display = "block";
      documentRef.getElementById("presentation-container").style.display =
        "none";
    }
  }

  template() {
    return html`
      <div class="p-4 flex items-center justify-between border-b">
        <h1 class="flex-1 text-3xl font-bold">Datasci</h1>
        <div class="flex-1 text-center">
          <div
              class="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <button
                type="button"
                data-state="${!this.presenting ? "active" : ""}"
                class="rounded-sm px-3 py-1.5 font-medium transition-all focus-visible:outline-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                id="application-tabs--workflow-btn"
                @click>
              Workflow
            </button>
            <button
                type="button"
                data-state="${this.presenting ? "active" : ""}"
                class="rounded-sm px-3 py-1.5 font-medium transition-all focus-visible:outline-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                id="application-tabs--presentation-btn"
                @click>
              Presentation
            </button>
          </div>
        </div>
        <div class="flex-1 text-right">
          <theme-switcher-oid><theme-switcher-oid />
        </div>
      </div>
      <div id="workflow-container">workflow</div>
      <div id="presentation-container" style="display: none">presentation</div>
    `;
  }

  _onClick(evt) {
    if (evt.target.innerText === "Workflow") {
      this.presenting = false;
    } else if (evt.target.innerText === "Presentation") {
      this.presenting = true;
    }

    this.tabChanged();
  }
}

Oid.component({
  id: "presentation:application",
  element: "application-oid",
  implementation: ApplicationOid,
});
