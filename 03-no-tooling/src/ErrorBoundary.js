import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
import styled from "styled-components";
class ErrorBoundary extends Component {
  state = {
    error: null,
    info: null,
  };
  componentDidCatch(error, info) {
    this.setState({ error, info });
  }
  render() {
    const { error } = this.state;
    if (error) {
      return _jsx(ErrorBoundaryFallbackComponent, {});
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
const ErrorBoundaryFallbackComponent = () =>
  _jsx(Layout, {
    children: _jsxs(Message, {
      children: [
        "Something Error Ooccurring",
        _jsx("span", {
          role: "img",
          "aria-label": "face-emoji",
          children: "\uD83D\uDE1E",
        }),
      ],
    }),
  });
