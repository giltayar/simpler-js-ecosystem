import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from "react";
const Copyright = memo(
  () =>
    _jsxs("footer", {
      className: "info",
      children: [
        _jsxs("p", {
          children: [
            "Created by",
            " ",
            _jsx("a", {
              href: "https://ryota-murakami.github.io/",
              children: "Ryota Murakamai",
            }),
          ],
        }),
        _jsxs("p", {
          children: [
            "Part of ",
            _jsx("a", { href: "http://todomvc.com", children: "TodoMVC" }),
          ],
        }),
      ],
    }),
  () => true
);
export default Copyright;
