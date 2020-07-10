import React, { useReducer, useContext, useState } from "react";
import DatePicker from "react-date-picker";
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
  todos: { completed: TodoType[]; incomplete: TodoType[] };
  categories: string[];
};

const initialState: AAState = {
  todos: {
    completed: todos.filter((todo) => todo.completed),
    incomplete: todos.filter((todo) => !todo.completed),
  },
  categories: [],
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
  const { completed, sortOrder, id } = todo;
  const {
    completed: completedTodos,
    incomplete: incompleteTodos,
  } = state.todos;
  const previousTodo = completed
    ? state.todos.completed.find((td) => td.sortOrder === sortOrder - 1)
    : state.todos.incomplete.find((td) => td.sortOrder === sortOrder - 1);
  const nextTodo = completed
    ? state.todos.completed.find((td) => td.sortOrder === sortOrder + 1)
    : state.todos.incomplete.find((td) => td.sortOrder === sortOrder + 1);
  const movedUpTodo = { ...todo, sortOrder: sortOrder - 1 };
  const movedDownTodo = { ...todo, sortOrder: sortOrder + 1 };

  switch (action.type) {
    case "createTodo":
      return {
        ...state,
        todos: {
          ...state.todos,
          incomplete: [...incompleteTodos, todo],
        },
      };
    case "markTodoComplete":
      return {
        ...state,
        todos: {
          completed: [...completedTodos, { ...todo, completed: true }],
          incomplete: incompleteTodos.filter(
            (incompleteTodo) => incompleteTodo.id !== id
          ),
        },
      };
    case "markTodoIncomplete":
      return {
        ...state,
        todos: {
          completed: completedTodos.filter(
            (completedTodo) => completedTodo.id !== id
          ),
          incomplete: [...incompleteTodos, { ...todo, completed: false }],
        },
      };
    case "moveTodoUp":
      if (previousTodo) {
        if (!completed) {
          const newMovedUpState = {
            ...state,
            todos: {
              ...state.todos,
              incomplete: [
                ...incompleteTodos.filter(
                  (incompleteTodo) =>
                    incompleteTodo.id !== id &&
                    incompleteTodo.sortOrder !== sortOrder - 1
                ),
                movedUpTodo,
                { ...previousTodo, sortOrder: previousTodo.sortOrder + 1 },
              ],
            },
          };
          return newMovedUpState;
        }
      } else {
        return { ...state };
      }
    case "moveTodoDown":
      if (nextTodo && !completed) {
        const newMovedUpState = {
          ...state,
          todos: {
            ...state.todos,
            incomplete: [
              ...incompleteTodos.filter(
                (incompleteTodo) =>
                  incompleteTodo.id !== id &&
                  incompleteTodo.sortOrder !== sortOrder + 1
              ),
              movedDownTodo,
              { ...nextTodo, sortOrder: nextTodo.sortOrder - 1 },
            ],
          },
        };
        return newMovedUpState;
      } else {
        return { ...state };
      }
    case "deleteTodo":
      if (completed) {
        return {
          ...state,
          todos: {
            ...state.todos,
            completed: [...state.todos.completed.filter((td) => td.id !== id)],
          },
        };
      } else {
        return {
          ...state,
          todos: {
            ...state.todos,
            incomplete: [
              ...state.todos.incomplete.filter((td) => td.id !== id),
            ],
          },
        };
      }
    default:
      throw new Error();
  }
};

type TodoProps = {
  todo: TodoType;
};

const Todo: React.FC<TodoProps> = ({ todo }) => {
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
  const toggleCompleted = () => {
    todo.completed ? markIncomplete() : markComplete();
  };
  const doSomething = () => {
    alert("I did it!");
  };
  const deleteTodo = () => {
    dispatch({ type: "deleteTodo", payload: todo });
  };

  return (
    <div
      className={`todo ${todo.completed ? "completedTodo" : "incompleteTodo"}`}
    >
      <button onClick={doSomething}>Do It!</button>
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
            <div onClick={sortUp} className="sortingButton sortUp link">
              <FaArrowUp />
            </div>
            <div onClick={sortDown} className="sortingButton sortDown link">
              <FaArrowDown />
            </div>
          </React.Fragment>
        ) : null}
        <div className="sortingButton sortDelete link" onClick={deleteTodo}>
          <FaTimes />
        </div>
      </div>
    </div>
  );
};

type TodoFormProps = {};

const TodoForm: React.FC<TodoFormProps> = () => {
  const [name, setName] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const { state, dispatch } = useContext(ReducerContext);
  const { completed, incomplete } = state.todos;
  const todoCount = completed.length + incomplete.length;
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const changeDueDate = (value: Date) => {
    if (value) setDueDate(value);
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
        id: todoCount,
        name,
        dueDate,
        completed: false,
        sortOrder: state.todos.incomplete.length,
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
      />
      <DatePicker
        onChange={(e) =>
          Array.isArray(e) ? changeDueDate(e[0]) : changeDueDate(e)
        }
        value={dueDate}
      />
      <button type="submit" className="todoSubmitButton" disabled={!name}>
        Add Todo
      </button>
    </form>
  );
};

const ReducerContext = React.createContext<{
  state: AAState;
  dispatch: React.Dispatch<ReducerAction>;
}>({
  state: { todos: { completed: [], incomplete: [] }, categories: [] },
  dispatch: () => {},
});

const sortDescByDueDate = (todos: TodoType[]) => {
  return todos.sort((a, b) => Number(b.dueDate) - Number(a.dueDate));
};

const sortAscBySortOrder = (todos: TodoType[]) => {
  return todos.sort((a, b) => a.sortOrder - b.sortOrder);
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todos } = state;
  const { incomplete, completed } = todos;
  const completedTodos = sortAscBySortOrder(completed);
  const incompleteTodos = sortAscBySortOrder(incomplete);
  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <div className="todoList">
          <div className="todoHeader">
            <div className="tableTitle">Todos</div>
            <div />
            <div />
          </div>
          <TodoForm />
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
