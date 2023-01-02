import { atom } from "recoil";
export var LocalStorageKey;
(function (LocalStorageKey) {
  LocalStorageKey["APP_STATE"] = "APP_STATE";
})(LocalStorageKey || (LocalStorageKey = {}));
function LoadAppStateFromLocalStorage() {
  const stringifiedJSON = window.localStorage.getItem(
    LocalStorageKey.APP_STATE
  );
  if (typeof stringifiedJSON === "string") {
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
