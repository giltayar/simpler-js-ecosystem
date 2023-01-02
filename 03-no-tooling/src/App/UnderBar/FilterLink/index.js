import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
const FilterLink = () => {
  const { pathname } = useLocation();
  return _jsxs("ul", {
    className: "filters",
    children: [
      _jsx("li", {
        children: _jsx(Link, {
          "data-cy": "all-filter",
          className: pathname === "/" ? "selected" : "",
          to: "/",
          children: "All",
        }),
      }),
      _jsx("li", {
        children: _jsx(Link, {
          "data-cy": "active-filter",
          className: pathname === "/active" ? "selected" : "",
          to: "/active",
          children: "Active",
        }),
      }),
      _jsx("li", {
        children: _jsx(Link, {
          "data-cy": "completed-filter",
          className: pathname === "/completed" ? "selected" : "",
          to: "/completed",
          children: "Completed",
        }),
      }),
    ],
  });
};
export default FilterLink;
