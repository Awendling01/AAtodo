import React, { useReducer, useContext, useState } from "react";
import "./App.css";
import todos from "./utils/data";
import { TodoType } from "./utils/types";
import {
  FaArrowUp,
  FaArrowDown,
  FaTimes,
  FaRecycle,
  FaCheck,
} from "react-icons/fa";

type AAState = {
  todos: TodoType[];
};

const initialState: AAState = {
  todos,
};

type ReducerAction = {
  type:
    | "markTodoComplete"
    | "markTodoIncomplete"
    | "createTodo"
    | "deleteTodo"
    | "moveTodoUp"
    | "moveTodoDown";
  payload: TodoType;
};

const reducer = (state: AAState, action: ReducerAction) => {
  const todo = action.payload;
  switch (action.type) {
    case "createTodo":
      return {
        ...state,
        todos: [...todos, todo],
      };
    case "markTodoComplete":
      return {
        ...state,
        todos: [
          ...state.todos.filter((td) => td.id !== todo.id),
          { ...todo, completed: true },
        ],
      };
    case "markTodoIncomplete":
      return {
        ...state,
        todos: [
          ...state.todos.filter((td) => td.id !== todo.id),
          { ...todo, completed: false },
        ],
      };
    case "moveTodoUp":
      return state;
    case "moveTodoDown":
      return state;
    case "deleteTodo":
      return state;
    default:
      throw new Error();
  }
};

type TodoProps = {
  todo: TodoType;
};

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { dispatch } = useContext(ReducerContext);
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
  const toggleCompleted = () => {
    todo.completed ? markIncomplete() : markComplete();
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
          <FaCheck />
        </div>
      )}
      <div className="todoColumn name">
        <div className="todoText firstColumn">{todo.name}</div>
      </div>
      <div className="todoColumn dueDate">
        <div className="todoText">{todo.dueDate.toDateString()}</div>
      </div>
      <div className="todoColumn sortingButtonGroup">
        {!todo.completed ? (
          <React.Fragment>
            <div className="sortingButton sortUp link">
              <FaArrowUp />
            </div>
            <div className="sortingButton sortDown link">
              <FaArrowDown />
            </div>
          </React.Fragment>
        ) : null}
        <div className="sortingButton sortDelete link">
          <FaTimes />
        </div>
      </div>
    </div>
  );
};

type TodoInputProps = {};

const TodoInput: React.FC<TodoInputProps> = () => {
  const [name, setName] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const { state, dispatch } = useContext(ReducerContext);
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const changeDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.valueAsDate) setDueDate(e.currentTarget.valueAsDate);
  };
  const clearForm = () => {
    setName("");
    setDueDate(new Date());
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "createTodo",
      payload: {
        id: state.todos.length,
        name,
        dueDate,
        completed: false,
        sortOrder: state.todos.length,
      },
    });
    clearForm();
  };
  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        onChange={(e) => changeName(e)}
        className="todoInput"
        value={name}
        placeholder="new todo"
      ></input>
      <input
        name="dueDate"
        type="date"
        onChange={changeDueDate}
        className="todoInput"
        value={dueDate.toDateString()}
      ></input>
      <button
        type="submit"
        className="todoSubmitButton"
        disabled={!!name && !!dueDate}
      >
        Add Todo
      </button>
    </form>
  );
};

const ReducerContext = React.createContext<{
  state: AAState;
  dispatch: React.Dispatch<ReducerAction>;
}>({ state: { todos: [] }, dispatch: () => {} });

const sortDescByDueDate = (todos: TodoType[]) => {
  return todos.sort((a, b) => Number(b.dueDate) - Number(a.dueDate));
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todos } = state;
  const incompleteTodos = sortDescByDueDate(
    todos.filter((todo) => !todo.completed)
  );
  const completedTodos = sortDescByDueDate(
    todos.filter((todo) => todo.completed)
  );
  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <div className="todoList">
          <div className="todoHeader">
            <div className="tableTitle">Todos</div>
            <div />
            <div />
          </div>
          <TodoInput />
          {incompleteTodos.length ? (
            incompleteTodos.map((todo, todoIndex) => {
              return <Todo key={`todo${todoIndex}`} todo={todo} />;
            })
          ) : (
            <div className="todo">
              <div>All Done!</div>
            </div>
          )}
          {completedTodos.length ? (
            <React.Fragment>
              <div className="todoHeader">
                <div className="tableTitle">Todones</div>
                <div />
                <div />
              </div>
              {completedTodos.map((todo, todoIndex) => (
                <Todo key={`todone${todoIndex}`} todo={todo} />
              ))}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </ReducerContext.Provider>
  );
};

export default App;
