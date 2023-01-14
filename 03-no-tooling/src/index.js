import { html } from "htm/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/index.js";
import css from "./index.css.json" assert { type: "json" };

const root = ReactDOM.createRoot(
  /**@type {HTMLElement}*/ (document.getElementById("root"))
);

root.render(html`
  <${React.StrictMode}>
    <div class=${css.foo}>
      <${App} class=${css.foo} />
    <//>
  <//>
`);
