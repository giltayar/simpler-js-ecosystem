import {html} from 'htm/react'
const css = {
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  width: "100%",
};

export const NotFound = () =>
  html`
    <div data-cy="not-found-page" style=${css}>
      <h1>Page Not Found</h1>
    </div>`