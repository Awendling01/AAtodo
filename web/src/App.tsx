import React from "react";
import "./App.css";
import todos, { completedTodos } from "./utils/data";
import { TodoType } from "./utils/types";

type TodoProps = {
  todo: TodoType;
};

const Todo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div className="todo">
      <div className="name todoText">{todo.name}</div>
      <div className="dueDate todoText">{todo.dueDate.toDateString()}</div>
      <div className="completed todoText">
        {todo.completed ? "Complete" : "Incomplete"}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <div className="todoList">
        <div className="todoHeader">
          <div className="headerText">Todo</div>
          <div className="headerText">Due Date</div>
          <div className="headerText">Status</div>
        </div>
        {todos.map((todo, todoIndex) => {
          return <Todo key={`todo${todoIndex}`} todo={todo} />;
        })}
        <div className="todoHeader secondList">
          <div className="headerText">Todo</div>
          <div className="headerText">Due Date</div>
          <div className="headerText">Status</div>
        </div>
        {completedTodos.map((todo, todoIndex) => {
          return <Todo key={`todone${todoIndex}`} todo={todo} />;
        })}
        <button className="addButton">+</button>
      </div>
    </div>
  );
};

export default App;
