import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRef } from "react";
import { useRecoilState } from "recoil";
import { recoilState } from "../../dataStructure.js";
import { UUID } from "../../functions.js";
import { Layout } from "./style.js";
const NewTodoTextInput = () => {
  const [appState, setAppState] = useRecoilState(recoilState);
  const textInput = createRef();
  function addTodo(e) {
    if (textInput.current === null) return;
    if (e.key === "Enter" && textInput.current.value.trim().length > 0) {
      // make new TODO object
      const todo = {
        bodyText: textInput.current.value,
        completed: false,
        id: UUID(),
      };
      // add new TODO to entire TodoList
      setAppState({ todoList: [todo, ...appState.todoList] });
      // reset text input UI value
      textInput.current.value = "";
    }
  }
  return _jsx(Layout, {
    children: _jsxs("header", {
      className: "header",
      children: [
        _jsx("h1", { children: "todos" }),
        _jsx("input", {
          type: "text",
          className: "new-todo",
          placeholder: "What needs to be done?",
          ref: textInput,
          onKeyPress: (e) => addTodo(e),
          "data-testid": "new-todo-input-text",
          "data-cy": "new-todo-input-text",
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus: true,
        }),
      ],
    }),
  });
};
export default NewTodoTextInput;
