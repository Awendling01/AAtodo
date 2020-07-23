import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { CreateTodoInput, User } from "../generated/graphql";
import { formatDateForMutation } from "../utils/utils";

type TodoFormProps = {
  currentUser: User;
  incompleteCount: number;
  createTodo: (input: CreateTodoInput) => void;
};

export const TodoForm: React.FC<TodoFormProps> = ({
  currentUser,
  incompleteCount,
  createTodo,
}) => {
  const [name, setName] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<string>("");
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
    const input: CreateTodoInput = {
      todo: {
        name,
        dueDate: formatDateForMutation(dueDate),
        completed: false,
        sortOrder: incompleteCount,
        category,
        userId: currentUser.id,
        createdAt: formatDateForMutation(),
        updatedAt: formatDateForMutation(),
      },
    };
    createTodo(input);
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
