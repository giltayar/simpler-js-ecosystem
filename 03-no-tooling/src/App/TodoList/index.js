import { html } from "htm/react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoilState } from "../../dataStructure.js";
import Item from "./Item/index.js";
import { Layout } from "./style.js";

const TodoList = () => {
  const { pathname } = useLocation();
  const [appState, setAppState] = useRecoilState(recoilState);
  /**
   * @param {import('react').ChangeEvent<HTMLInputElement>} e
   */
  function toggleAllCheckbox(e) {
    // reverse all todo.completed: boolean flag
    setAppState({
      todoList: appState.todoList.map((t) => ({
        ...t,
        completed: e.target.checked,
      })),
    });
  }

  return html`
    <${Layout}>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange=${toggleAllCheckbox}
          data-cy="toggle-all-btn"
          data-testid="toggle-all-btn"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list" data-testid="todo-list">
          ${appState.todoList
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
            .map((t) => html`<${Item} key=${t.id} todo=${t} />`)}
        </ul>
      </section>
    <//>
  `;
};

export default TodoList;
