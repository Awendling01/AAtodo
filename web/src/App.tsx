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

type ReducerAction = {
  type: "markTodoComplete" | "markTodoIncomplete" | "createTodo";
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
  const toggleCompleted = () => {
    todo.completed ? markIncomplete() : markComplete();
  };
  return (
    <ul className="todo">
      <li className="todoColumn name">
        <div className="todoText firstColumn">{todo.name}</div>
      </li>
      <li className="todoColumn dueDate">
        <div className="todoText">{todo.dueDate.toDateString()}</div>
      </li>
      <li className="todoColumn completed">
        <div
          className="todoText lastColumn statusToggle link"
          onClick={toggleCompleted}
        >
          {todo.completed ? "Complete" : "Incomplete"}
        </div>
      </li>
    </ul>
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
      payload: { id: state.todos.length, name, dueDate, completed: false },
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

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todos } = state;
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
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
