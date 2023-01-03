import {html} from 'htm/react'
import { useState, createRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoilState } from "../../../dataStructure.js";
import { Layout } from "./style.js";
const Item = ({ todo }) => {
  const [appState, setAppState] = useRecoilState(recoilState);
  const editInput = createRef();
  const init = { onEdit: false };
  const [state, setState] = useState(init);
  const onClick = () => {
    setState({ onEdit: true });
  };
  const onBlurEdit = (e) => {
    if (e.currentTarget.value.trim().length > 0) {
      setState({ onEdit: false });
    } else {
      removeItem(todo.id);
    }
  };
  const submitEditText = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      if (e.currentTarget.value.trim().length > 0) {
        setState({ onEdit: false });
      }
    }
  };
  // Control Todo's CSS based on complex user interaction
  const SwitchStyle = (t, onEdit) => {
    switch (true) {
      case onEdit && t.completed:
        return "completed editing";
      case onEdit && !t.completed:
        return "editing";
      case !onEdit && t.completed:
        return "completed";
      case !onEdit && !t.completed:
        return "";
      default:
        return "";
    }
  };
  const reverseCompleted = (id) => {
    const toggled = appState.todoList.map((t) => {
      // search clicked item by id...
      if (t.id === id) {
        // change complated status only clicked item
        return { ...t, completed: !t.completed };
        // return other item without any changes
      } else {
        return t;
      }
    });
    setAppState({ todoList: toggled });
  };
  const removeItem = (terminate) => {
    const removed = appState.todoList.filter((t) => t.id !== terminate);
    setAppState({ todoList: removed });
  };
  const handleTodoTextEdit = (e, onEdit) => {
    const edited = appState.todoList.map((t) => {
      if (t.id === onEdit) {
        return { ...t, bodyText: e.target.value };
      } else {
        return t;
      }
    });
    setAppState({ todoList: edited });
  };
  useEffect(() => {
    // For fucus input element when double clicks text label. fix this https://github.com/laststance/create-react-app-typescript-todo-example-2021/issues/50
    if (state.onEdit === true && editInput.current !== null)
      editInput.current.focus();
  }, [editInput, state.onEdit]);
  return html`
    <${Layout} data-cy="todo-item">
      <li className=${SwitchStyle(todo, state.onEdit)} data-testid="todo-item">
        <div className="view" data-testid="view">
          <input
            className="toggle"
            type="checkbox"
            checked=${todo.completed}
            onChange=${() => reverseCompleted(todo.id)}
            data-cy="todo-item-complete-check"
            data-testid="todo-item-complete-check"
          />
          <label
            onClick=${onClick}
            data-cy="todo-body-text"
            data-testid="todo-body-text"
          >
            ${todo.bodyText}
          </label>
          <button
            className="destroy"
            onClick=${() => removeItem(todo.id)}
            data-cy="delete-todo-btn"
            data-testid="delete-todo-btn"
          />
        </div>
        <input
          ref=${editInput}
          onBlur=${onBlurEdit}
          className="edit"
          value=${todo.bodyText}
          onChange=${e => handleTodoTextEdit(e, todo.id)}
          onKeyDown=${e => submitEditText(e)}
          data-cy="todo-edit-input"
          data-testid="todo-edit-input"
        />
      </li>
    <//>
  `;
};
export default Item;
