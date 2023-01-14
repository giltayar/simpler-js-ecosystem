import { atom } from "recoil";

/**
 * @typedef {'/' | '/active' | '/completed'} Routes
 * */

/**
 * @typedef {{
 *   id: string
 *   bodyText: string
 *   completed: boolean
 * }} Todo
 */

/**
 * @typedef {Todo[]} TodoListType
 */

/**
 * @typedef {{
 *   todoList: TodoListType
 * }} AppState
 */

/**@enum {string} */
export const LocalStorageKey = {
  APP_STATE: "APP_STATE",
};

function LoadAppStateFromLocalStorage() {
  const stringifiedJSON = window.localStorage.getItem(
    LocalStorageKey.APP_STATE
  );

  if (typeof stringifiedJSON === "string") {
    /**@type {AppState} */
    const Loaded = JSON.parse(stringifiedJSON);

    return Loaded;
  }

  const BlankAppState = {
    todoList: [],
  };
  return BlankAppState;
}

export const recoilState = atom({
  default: LoadAppStateFromLocalStorage(),
  key: "initialAppState",
});
