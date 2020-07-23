import React from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaRecycle,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";
import { Todo } from "../generated/graphql";

type TodoProps = {
  todo: Todo;
  todoIndex: number;
  mutations: {
    markComplete: (todo: Todo) => void;
    markIncomplete: (todo: Todo) => void;
    sortUp: (todo: Todo, todoIndex: number) => void;
    sortDown: (todo: Todo, todoIndex: number) => void;
    deleteTodo: (todo: Todo) => void;
  };
};

export const TodoComponent: React.FC<TodoProps> = ({
  todo,
  todoIndex,
  mutations,
}) => {
  const {
    markComplete,
    markIncomplete,
    sortUp,
    sortDown,
    deleteTodo,
  } = mutations;

  return (
    <div
      className={`todo ${todo.completed ? "completedTodo" : "incompleteTodo"}`}
    >
      {todo.completed ? (
        <div
          className="sortingButton sortRestore link"
          onClick={() => markIncomplete(todo)}
        >
          <FaRecycle />
        </div>
      ) : (
        <div
          className="sortingButton sortComplete link"
          onClick={() => markComplete(todo)}
        >
          <FaCheckCircle />
        </div>
      )}
      <div className="todoColumn name">
        <div className="todoText firstColumn">
          {todo.name + " (" + todo.category + ")"}
        </div>
      </div>
      <div className="todoColumn dueDate">
        <div className="todoText">{new Date(todo.dueDate).toDateString()}</div>
      </div>
      <div className="todoColumn sortingButtonGroup">
        {!todo.completed ? (
          <React.Fragment>
            <div
              onClick={() => sortUp(todo, todoIndex)}
              className="sortingButton sortUp link"
            >
              <FaArrowUp />
            </div>
            <div
              onClick={() => sortDown(todo, todoIndex)}
              className="sortingButton sortDown link"
            >
              <FaArrowDown />
            </div>
          </React.Fragment>
        ) : null}
        <div
          className="sortingButton sortDelete link"
          onClick={() => deleteTodo(todo)}
        >
          <FaTrash />
        </div>
      </div>
    </div>
  );
};
