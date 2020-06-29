import React, { useReducer, useContext, useState } from "react";
import "./App.css";
import todos from "./utils/data";
import { TodoType } from "./utils/types";

type AAState = {
  todos: TodoType[];
};

const initialState: AAState = {
  todos,
};

type reducerAction = {
  type: "markTodoComplete" | "markTodoIncomplete";
  payload: TodoType;
};

const reducer = (state: AAState, action: reducerAction) => {
  const todo = action.payload;
  switch (action.type) {
    case "markTodoComplete":
      return {
        ...state,
        todos: [
          state.todos.filter((td) => td.id !== todo.id),
          { ...todo, completed: true },
        ],
      };
  }
};

type TodoProps = {
  todo: TodoType;
  todoIndex: number;
};

const Todo: React.FC<TodoProps> = ({ todo, todoIndex }) => {
  return (
    <div className="todo link">
      <div className="name todoText">{todo.name}</div>
      <div className="dueDate todoText">{todo.dueDate.toDateString()}</div>
      <div className="completed todoText">
        {todo.completed ? "Completed" : "Incomplete"}
      </div>
    </div>
  );
};

const App = () => {
  const incompleteTodos = todos.filter((todo) => !todo.completed);

  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="App">
      <div className="todoList">
        <div className="todoHeader">
          <div className="headerText">ToDo</div>
          <div className="headerText">DueDate</div>
          <div className="headerText">Status</div>
        </div>
        {incompleteTodos.map((todo, todoIndex) => {
          return (
            <Todo key={`todo${todoIndex}`} todo={todo} todoIndex={todoIndex} />
          );
        })}
      </div>
      <div className="todoList secondList">
        <div className="todoHeader">
          <div className="headerText">ToDo</div>
          <div className="headerText">DueDate</div>
          <div className="headerText">Status</div>
        </div>
        {completedTodos.map((todo, todoIndex) => {
          return (
            <Todo key={`todo${todoIndex}`} todo={todo} todoIndex={todoIndex} />
          );
        })}
        <div className="addButton">+</div>
      </div>
    </div>
  );
};

export default App;
