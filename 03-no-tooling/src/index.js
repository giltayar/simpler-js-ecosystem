import {html} from 'htm/react';
import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App/index.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(html`
  <${React.StrictMode}>
    <${App} />
  <//>
`);
