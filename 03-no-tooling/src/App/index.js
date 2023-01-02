import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import ErrorBoundary from "../ErrorBoundary.js";
import { NotFound } from "../NotFound.js";
import TodoMVC from "./TodoMVC.js";

const App = () =>
  _jsx(ErrorBoundary, {
    children: _jsx(BrowserRouter, {
      children: _jsx(RecoilRoot, {
        children: _jsxs(Routes, {
          children: [
            _jsx(Route, { path: "/", element: _jsx(TodoMVC, {}) }),
            _jsx(Route, { path: "/active", element: _jsx(TodoMVC, {}) }),
            _jsx(Route, { path: "/completed", element: _jsx(TodoMVC, {}) }),
            _jsx(Route, { path: "*", element: _jsx(NotFound, {}) }),
          ],
        }),
      }),
    }),
  });
export default App;
