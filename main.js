import { Oid } from "/lib/oidlib-dev";
import "./style.css";

Oid.setDefault({
  stylesheet: ["/style.css"],
  stylable: true,
});

// Componentes de Presentation
import("./modules/presentation/components/application.js");
import("./modules/presentation/components/theme-switcher.js");
import("./modules/presentation/components/template-lister.js");
import("./modules/presentation/components/builder.js");
import("./modules/presentation/components/presenter.js");
import("./modules/presentation/components/mock-workflow.js");
import("./modules/presentation/components/mock-component.js");
import("./modules/presentation/components/templates/template1.js");
