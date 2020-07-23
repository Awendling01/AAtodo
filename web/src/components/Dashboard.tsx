import React, { useState } from "react";
import { User, Todo } from "../generated/graphql";
import { nonNullable, useTodoList } from "../utils/utils";
import TodoForm from "./TodoForm";
import { TodoComponent } from "./Todo";

type DashboardProps = {
  currentUser: User;
};
const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );
  const todos: Todo[] =
    currentUser.todosByUserId.nodes.filter(nonNullable) || [];
  const {
    completed,
    incomplete,
    categories,
    createTodo,
    ...todoMutations
  } = useTodoList(todos, currentUser);
  const selectCategory = (category: string) => {
    setCurrentCategory(category);
  };
  const clearCategory = () => {
    setCurrentCategory(undefined);
  };
  const filterByCategory = (allTodos: Todo[], category?: string) => {
    return category
      ? allTodos.filter((todo) => todo.category === category)
      : allTodos;
  };
  return (
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
        <TodoForm
          currentUser={currentUser}
          incompleteCount={incomplete.length}
          createTodo={createTodo}
        />
        {incomplete.length ? (
          filterByCategory(incomplete, currentCategory).map(
            (todo, todoIndex) => {
              return (
                <TodoComponent
                  key={`todo${todoIndex}`}
                  todo={todo}
                  mutations={todoMutations}
                  todoIndex={todoIndex}
                />
              );
            }
          )
        ) : (
          <div className="todo">
            <div>All Done!</div>
          </div>
        )}
        {completed.length ? (
          <React.Fragment>
            <div className="todoHeader">
              <div className="tableTitle">DONE</div>
              <div />
              <div />
            </div>
            {filterByCategory(completed, currentCategory).map(
              (todo, todoIndex) => (
                <TodoComponent
                  key={`todone${todoIndex}`}
                  todo={todo}
                  mutations={todoMutations}
                  todoIndex={todoIndex}
                />
              )
            )}
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};
export default Dashboard;
