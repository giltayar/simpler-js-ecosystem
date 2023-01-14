import { html } from "htm/react";
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

  return html`
    <${Layout}>
      <footer className="footer">
        <span className="todo-count">
          <strong data-cy="remaining-uncompleted-todo-count">${backlog}</strong
          >${" "} item left
        </span>
        <${FilterLink} />

        ${completed > 0 &&
        html` <button
          onClick=${clearCompleted}
          className="clear-completed"
          data-cy="clear-completed-button"
        >
          Clear completed
        </button>`}
      </footer>
    <//>
  `;
};

export default UnderBar;
