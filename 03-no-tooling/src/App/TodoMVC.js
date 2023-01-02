import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { recoilState, LocalStorageKey } from "../dataStructure.js";
import Copyright from "./Copyright.js";
import NewTodoInput from "./NewTodoInput/index.js";
import { Layout } from "./style.js";
import TodoList from "./TodoList/index.js";
import UnderBar from "./UnderBar/index.js";
const TodoMVC = () => {
  const appState = useRecoilValue(recoilState);
  // if appState has changes, save it LocalStorage.
  useEffect(() => {
    window.localStorage.setItem(
      LocalStorageKey.APP_STATE,
      JSON.stringify(appState) // convert JavaScript Object to string
    );
  }, [appState]);
  return _jsxs(Layout, {
    children: [
      _jsxs("section", {
        className: "todoapp",
        children: [
          _jsx(NewTodoInput, {}),
          appState.todoList.length
            ? _jsxs(_Fragment, {
                children: [_jsx(TodoList, {}), _jsx(UnderBar, {})],
              })
            : null,
        ],
      }),
      _jsx(Copyright, {}),
    ],
  });
};
export default TodoMVC;
