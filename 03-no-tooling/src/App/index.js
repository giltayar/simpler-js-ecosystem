import {html} from 'htm/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import ErrorBoundary from "../ErrorBoundary.js";
import { NotFound } from "../NotFound.js";
import TodoMVC from "./TodoMVC.js";

const App = () => html`
<${ErrorBoundary}>
  <${BrowserRouter}>
    <${RecoilRoot}>
      <${Routes}>
        <${Route} path="/" element=${html`<${TodoMVC} />`} />
        <${Route} path="/active" element=${html`<${TodoMVC} />`} />
        <${Route} path="/completed" element=${html`<${TodoMVC} />`} />
        <${Route} path="*" element=${html`<${NotFound} />`} />
      <//>
    <//>
  <//>
<//>`;

export default App;
