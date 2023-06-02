import { html, Oid, OidUI } from "/lib/oidlib-dev";

export class AplicacaoOid extends OidUI {
  activeTab = "workflow";

  tabChanged() {
    this.shadowRoot
      .getElementById("application-tabs--workflow-btn")
      ?.setAttribute(
        "data-state",
        this.activeTab === "workflow" ? "active" : ""
      );
    this.shadowRoot
      .getElementById("application-tabs--presentation-btn")
      ?.setAttribute(
        "data-state",
        this.activeTab === "presentation" ? "active" : ""
      );

    this.shadowRoot.getElementById("application-container").innerHTML =
      this.activeTab;
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
                data-state="${this.activeTab === "workflow" ? "active" : ""}"
                class="rounded-sm px-3 py-1.5 font-medium transition-all focus-visible:outline-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                id="application-tabs--workflow-btn"
                @click>
              Workflow
            </button>
            <button
                type="button"
                data-state="${this.activeTab === "presentation" ? "active" : ""
      }"
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
      <div id="application-container">{{this.activeTab}}</div>
    `;
  }

  _onClick(evt) {
    if (evt.target.innerText === "Workflow") {
      this.activeTab = "workflow";
    } else if (evt.target.innerText === "Presentation") {
      this.activeTab = "presentation";
    }

    this.tabChanged();
    this.render();
  }
}

Oid.component({
  id: "presentation:aplicacao",
  element: "aplicacao-oid",
  implementation: AplicacaoOid,
});
