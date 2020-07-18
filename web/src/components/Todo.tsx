import React, { useContext } from "react";
import { TodoType } from "../utils/types";
import { ReducerContext } from "../utils/Context";
import {
  FaArrowUp,
  FaArrowDown,
  FaRecycle,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

type TodoProps = {
  todo: TodoType;
};

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { dispatch } = useContext(ReducerContext);
  //Event Handler Functions
  const markComplete = () => {
    dispatch({ type: "markTodoComplete", payload: todo });
  };
  const markIncomplete = () => {
    dispatch({ type: "markTodoIncomplete", payload: todo });
  };
  const sortUp = () => {
    dispatch({ type: "moveTodoUp", payload: todo });
  };
  const sortDown = () => {
    dispatch({ type: "moveTodoDown", payload: todo });
  };
  const deleteTodo = () => {
    dispatch({ type: "deleteTodo", payload: todo });
  };

  return (
    <div
      className={`todo ${todo.completed ? "completedTodo" : "incompleteTodo"}`}
    >
      {todo.completed ? (
        <div
          className="sortingButton sortRestore link"
          onClick={markIncomplete}
        >
          <FaRecycle />
        </div>
      ) : (
        <div className="sortingButton sortComplete link" onClick={markComplete}>
          <FaCheckCircle />
        </div>
      )}
      <div className="todoColumn name">
        <div className="todoText firstColumn">
          {todo.name + " (" + todo.category + ")"}
        </div>
      </div>
      <div className="todoColumn dueDate">
        <div className="todoText">{todo.dueDate}</div>
      </div>
      <div className="todoColumn sortingButtonGroup">
        {!todo.completed ? (
          <React.Fragment>
            <div onClick={sortUp} className="sortingButton sortUp link">
              <FaArrowUp />
            </div>
            <div onClick={sortDown} className="sortingButton sortDown link">
              <FaArrowDown />
            </div>
          </React.Fragment>
        ) : null}
        <div className="sortingButton sortDelete link" onClick={deleteTodo}>
          <FaTrash />
        </div>
      </div>
    </div>
  );
};
