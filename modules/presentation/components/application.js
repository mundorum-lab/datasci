import { html, Oid, OidUI } from "/lib/oidlib-dev";

export class ApplicationOid extends OidUI {
  // presenting = false -> workflow
  // presenting = true -> presentation
  presenting = false;

  tabChanged() {
    this.shadowRoot
      .getElementById("application-tabs--workflow-btn")
      ?.setAttribute("data-state", !this.presenting ? "active" : "");
    this.shadowRoot
      .getElementById("application-tabs--presentation-btn")
      ?.setAttribute("data-state", this.presenting ? "active" : "");

    this._notify("tabChanged", {
      value: this.presenting ? "presentation" : "workflow",
    });

    if (this.presenting) {
      this.shadowRoot.getElementById("workflow-container").style.display =
        "none";
      this.shadowRoot.getElementById("presentation-container").style.display =
        "flex";
    } else {
      this.shadowRoot.getElementById("workflow-container").style.display =
        "flex";
      this.shadowRoot.getElementById("presentation-container").style.display =
        "none";
    }
  }

  template() {
    return html`
      <div class="min-h-screen flex flex-col">
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
          <div id="presentation-container" class="flex-grow flex flex-col" style="display: none">
            <presenter-oid
              class="flex-grow flex flex-col"
              subscribe="presentation/html~getJSONHTMLDescription;presentation/template~templateReady;presentation/tabs~tabChanged"
            ></presenter-oid>
            <builder-oid
              subscribe="workflow/graph~getJSONHTML"
              publish="returnJSONHTMLDescription~presentation/html"
            ></builder-oid>
            <mock-workflow-oid
              publish="returnJSONHTML~workflow/graph"
              subscribe="presentation/tabs~tabChanged"
            ></mock-workflow-oid>
          </div>
          <div id="workflow-container" class="w-full h-full flex items-stretch flex-grow">
            <workflow-main-page class="w-full flex-grow"></workflow-main-page>
          </div>
      </div>
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
