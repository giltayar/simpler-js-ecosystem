import { html } from "htm/react";
import { Component } from "react";
import styled from "styled-components";

class ErrorBoundary extends Component {
  state = {
    error: null,
    info: null,
  };

  /**
   * @param {any} error, @param {any} info
   */
  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return html`<${ErrorBoundaryFallbackComponent} />`;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Message = styled.div`
  padding: 40px;
  border: 2px #78909c solid;
  border-radius: 5px;
  font-size: 24px;
  color: #78909c;
`;

const ErrorBoundaryFallbackComponent = () => html` <${Layout}>
  <${Message}>
    Something Error Ooccurring
    <span role="img" aria-label="face-emoji"> 😞 </span>
  <//>
<//>`;
