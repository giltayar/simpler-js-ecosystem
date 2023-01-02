import { jsx as _jsx } from "react/jsx-runtime";
const css = {
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  width: "100%",
};
export const NotFound = () =>
  _jsx("div", {
    "data-cy": "not-found-page",
    style: css,
    children: _jsx("h1", { children: "Page Not Found" }),
  });
