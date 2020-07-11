import React, { useReducer } from "react";
import { TodoForm } from "./components/TodoForm";
import "./App.css";

import { ReducerContext } from "./utils/Context";
import { reducer, initialState } from "./reducer/reducer";
import { sortAscBySortOrder } from "./utils/utils";
import { Todo } from "./components/Todo";

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
            <div className="tableTitle">TODO</div>
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
                <div className="tableTitle">DONE</div>
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
