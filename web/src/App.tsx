import React, { useReducer, useState } from "react";
import { TodoForm } from "./components/TodoForm";
import "./App.css";

import { ReducerContext } from "./utils/Context";
import { reducer, initialState } from "./reducer/reducer";
import { sortAscBySortOrder } from "./utils/utils";
import { Todo } from "./components/Todo";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );
  const { todos } = state;
  const { incomplete, completed } = todos;
  const allTodos = [...incomplete, ...completed];
  const completedTodos = currentCategory
    ? sortAscBySortOrder(
        completed.filter((td) => td.category === currentCategory)
      )
    : sortAscBySortOrder(completed);
  const incompleteTodos = currentCategory
    ? sortAscBySortOrder(
        incomplete.filter((td) => td.category === currentCategory)
      )
    : sortAscBySortOrder(incomplete);
  const categories = allTodos
    .map((todo) => todo.category)
    .filter((value, index, array) => array.indexOf(value) === index);
  const selectCategory = (category: string) => {
    setCurrentCategory(category);
  };
  const clearCategory = () => {
    setCurrentCategory(undefined);
  };
  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <div>
          {currentCategory ? (
            <div className="currentCategoryTab" onClick={clearCategory}>
              <div className="todoText">{currentCategory}</div>
            </div>
          ) : null}
          {categories.map((category, categoryIndex) => (
            <div
              key={`categoryTab${categoryIndex}`}
              className="categoryTab"
              onClick={() => selectCategory(category)}
            >
              <div className="todoText">{category}</div>
            </div>
          ))}
        </div>
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
