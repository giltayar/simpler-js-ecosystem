import {html} from 'htm/react'
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
  return html`
      <${Layout}>
      <section className="todoapp">
        <${NewTodoInput} />
        ${appState.todoList.length ?
          html`
            <${TodoList} />
            <${UnderBar} />
          `
          : null}
      </section>
      <${Copyright} />
    </${Layout}>
  `;
};
export default TodoMVC;
