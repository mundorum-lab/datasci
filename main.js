import { Oid } from "/lib/oidlib-dev";
import "./style.css";

Oid.setDefault({
  stylesheet: [],
  stylable: true,
  shadow: false,
});

// Componentes de Presentation
import("./modules/presentation/components/aplicacao/aplicacao.js");
import("./modules/presentation/components/theme-switcher/theme-switcher.js");
