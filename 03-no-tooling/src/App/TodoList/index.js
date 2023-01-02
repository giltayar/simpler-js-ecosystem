import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoilState } from "../../dataStructure.js";

import Item from "./Item/index.js";

import { Layout } from "./style.js";
const TodoList = () => {
  const { pathname } = useLocation();
  const [appState, setAppState] = useRecoilState(recoilState);
  function toggleAllCheckbox(e) {
    // reverse all todo.completed: boolean flag
    setAppState({
      todoList: appState.todoList.map((t) => ({
        ...t,
        completed: e.target.checked,
      })),
    });
  }
  return _jsx(Layout, {
    children: _jsxs("section", {
      className: "main",
      children: [
        _jsx("input", {
          id: "toggle-all",
          className: "toggle-all",
          type: "checkbox",
          onChange: toggleAllCheckbox,
          "data-cy": "toggle-all-btn",
          "data-testid": "toggle-all-btn",
        }),
        _jsx("label", {
          htmlFor: "toggle-all",
          children: "Mark all as complete",
        }),
        _jsx("ul", {
          className: "todo-list",
          "data-testid": "todo-list",
          children: appState.todoList
            .filter((t) => {
              switch (pathname) {
                case "/":
                  return true;
                case "/active":
                  return t.completed === false;
                case "/completed":
                  return t.completed === true;
                default:
                  return true;
              }
            })
            .map((t) => {
              return _jsx(Item, { todo: t }, t.id);
            }),
        }),
      ],
    }),
  });
};
export default TodoList;
