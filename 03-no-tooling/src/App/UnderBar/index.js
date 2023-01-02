import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRecoilState } from "recoil";
import { recoilState } from "../../dataStructure.js";
import FilterLink from "./FilterLink/index.js";
import { Layout } from "./style.js";
const UnderBar = () => {
  const [appState, setAppState] = useRecoilState(recoilState);
  const completed = appState.todoList.filter(
    (t) => t.completed === true
  ).length;
  const backlog = appState.todoList.filter((t) => t.completed === false).length;
  function clearCompleted() {
    setAppState({
      todoList: appState.todoList.filter((t) => !t.completed),
    });
  }
  return _jsx(Layout, {
    children: _jsxs("footer", {
      className: "footer",
      children: [
        _jsxs("span", {
          className: "todo-count",
          children: [
            _jsx("strong", {
              "data-cy": "remaining-uncompleted-todo-count",
              children: backlog,
            }),
            " ",
            "item left",
          ],
        }),
        _jsx(FilterLink, {}),
        completed > 0 &&
          _jsx("button", {
            onClick: clearCompleted,
            className: "clear-completed",
            "data-cy": "clear-completed-button",
            children: "Clear completed",
          }),
      ],
    }),
  });
};
export default UnderBar;
