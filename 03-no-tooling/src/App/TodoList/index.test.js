import { jsx as _jsx } from "react/jsx-runtime";
import { fireEvent } from "@testing-library/react";
import { TestRenderer } from "../../testUtil.js";
import TodoList from "./index.js";
const initialRecoilState = {
  todoList: [
    {
      bodyText: "monster",
      completed: false,
      id: "TsHx9eEN5Y4A",
    },
    {
      bodyText: "boss black",
      completed: false,
      id: "ba91OwrK0Dt8",
    },
    {
      bodyText: "caffe latte",
      completed: false,
      id: "QwejYipEf5nk",
    },
  ],
};
test("should be render 3 todo items in initialAppState", () => {
  const screen = TestRenderer(_jsx(TodoList, {}), initialRecoilState);
  expect(screen.getByTestId("todo-list")).toBeInTheDocument();
  expect(screen.getByTestId("todo-list").children.length).toBe(3);
  expect(Array.isArray(screen.getAllByTestId("todo-item"))).toBe(true);
  expect(screen.getAllByTestId("todo-item")[0]).toHaveTextContent("monster");
  expect(screen.getAllByTestId("todo-item")[1]).toHaveTextContent("boss black");
  expect(screen.getAllByTestId("todo-item")[2]).toHaveTextContent(
    "caffe latte"
  );
});
test("should be work delete todo button", () => {
  const screen = TestRenderer(_jsx(TodoList, {}), initialRecoilState);
  // delete first item
  fireEvent.click(screen.getAllByTestId("delete-todo-btn")[0]);
  // assertions
  expect(screen.getByTestId("todo-list").children.length).toBe(2);
  expect(Array.isArray(screen.getAllByTestId("todo-item"))).toBe(true);
  expect(screen.getAllByTestId("todo-item")[0]).toHaveTextContent("boss black");
  expect(screen.getAllByTestId("todo-item")[1]).toHaveTextContent(
    "caffe latte"
  );
});
test("should be work correctly all completed:true|false checkbox toggle button", () => {
  const screen = TestRenderer(_jsx(TodoList, {}), initialRecoilState);
  // toggle on
  fireEvent.click(screen.getByTestId("toggle-all-btn"));
  // should be completed all todo items
  expect(screen.getAllByTestId("todo-item-complete-check")[0].checked).toBe(
    true
  ); /* eslint-disable-line prettier/prettier */
  expect(screen.getAllByTestId("todo-item-complete-check")[1].checked).toBe(
    true
  ); /* eslint-disable-line prettier/prettier */
  expect(screen.getAllByTestId("todo-item-complete-check")[2].checked).toBe(
    true
  ); /* eslint-disable-line prettier/prettier */
  // toggle off
  fireEvent.click(screen.getByTestId("toggle-all-btn"));
  // should be not comleted all todo items
  expect(screen.getAllByTestId("todo-item-complete-check")[0].checked).toBe(
    false
  ); /* eslint-disable-line prettier/prettier */
  expect(screen.getAllByTestId("todo-item-complete-check")[1].checked).toBe(
    false
  ); /* eslint-disable-line prettier/prettier */
  expect(screen.getAllByTestId("todo-item-complete-check")[2].checked).toBe(
    false
  ); /* eslint-disable-line prettier/prettier */
});
