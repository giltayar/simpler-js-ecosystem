import { jsx as _jsx } from "react/jsx-runtime";
import { render } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";
test("should be render fallback page Error was thrown", () => {
  const InvalidComponent = () => new Date();
  const screen = render(
    _jsx(ErrorBoundary, { children: _jsx(InvalidComponent, {}) })
  );
  expect(screen.getByText("Something Error Ooccurring")).toBeInTheDocument();
});
