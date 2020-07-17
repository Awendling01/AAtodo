import React, { useContext, useState } from "react";
import DatePicker from "react-date-picker";
import { ReducerContext } from "../utils/Context";

type TodoFormProps = {};

export const TodoForm: React.FC<TodoFormProps> = () => {
  const [name, setName] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<string>("");
  const { state, dispatch } = useContext(ReducerContext);
  const { completed, incomplete } = state.todos;
  const todoCount = completed.length + incomplete.length;
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.currentTarget.value);
  };
  const changeDueDate = (value: Date) => {
    if (value) setDueDate(value);
  };
  const clearForm = () => {
    setName("");
    setDueDate(new Date());
    setCategory("");
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
        category,
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
      <input
        name="category"
        type="text"
        onChange={(e) => changeCategory(e)}
        className="todoInput"
        value={category}
        placeholder="category"
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
export default TodoForm;
