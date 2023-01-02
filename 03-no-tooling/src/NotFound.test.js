import { jsx as _jsx } from "react/jsx-runtime";
import { render } from "@testing-library/react";
import { NotFound } from "./NotFound";
test("<NotFound /> should render Page Not Found message", () => {
  const screen = render(_jsx(NotFound, {}));
  expect(screen.getByText("Page Not Found")).toBeInTheDocument();
});
