import React from "react";
import "./App.css";
import todos from "./utils/data";
import { TodoType } from "./utils/types";

type TodoProps = {
  todo: TodoType;
  todoIndex: number;
};

const Todo: React.FC<TodoProps> = ({ todo, todoIndex }) => {
  return (
    <div className="todo">
      <div className="name todoText">{todo.name}</div>
      <div className="dueDate todoText">{todo.dueDate.toDateString()}</div>
      <div className="completed todoText">
        {todo.completed ? "Completed" : "Incomplete"}
      </div>
    </div>
  );
};

const App = () => {
  // const upcomingTodos = todos.filter(
  //   (todo) => Number(todo.dueDate) > Number(new Date())
  // );

  // const overdueTodos = todos.filter(
  //   (todo) => Number(todo.dueDate) < Number(new Date())
  // );

  // const todaysTodos = todos.filter(
  //   (todo) => Number(todo.dueDate) === Number(new Date())
  // );

  // const categoryNames = todos
  //   .map((todo) => todo.category)
  //   .filter((v, i, a) => a.indexOf(v) === i);

  // const todosByCategory = categoryNames.map((categoryName) => ({
  //   categoryName,
  //   categoryTodos: todos.filter((todo) => todo.category === categoryName),
  // }));

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
        <button className="addButton">+</button>
      </div>
    </div>
  );
};

export default App;
