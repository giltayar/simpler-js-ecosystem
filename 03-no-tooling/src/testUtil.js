import { jsx as _jsx } from "react/jsx-runtime";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { recoilState } from "./dataStructure.ja";
const defaultValue = {
  todoList: [],
};
export const TestRenderer = (ui, initialRecoilStateValue = defaultValue) =>
  render(
    _jsx(BrowserRouter, {
      children: _jsx(RecoilRoot, {
        initializeState: ({ set }) => set(recoilState, initialRecoilStateValue),
        children: ui,
      }),
    })
  );
