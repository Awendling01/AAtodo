import { TodoType } from "./types";

const todos: TodoType[] = [
  {
    name: "Get groceries",
    dueDate: new Date(),
    completed: false,
  },
  {
    name: "Wash dog",
    dueDate: new Date(),
    completed: false,
  },
  {
    name: "Clean house",
    dueDate: new Date(),
    completed: false,
  },
  {
    name: "Prospect gold",
    dueDate: new Date(),
    completed: true,
  },
];

export const completedTodos: TodoType[] = [
  {
    name: "Wash Car",
    dueDate: new Date(),
    completed: true,
  },
  {
    name: "Do Laundry",
    dueDate: new Date(),
    completed: true,
  },
  {
    name: "Clean Garage",
    dueDate: new Date(),
    completed: true,
  },
  {
    name: "Shovel Poop",
    dueDate: new Date(),
    completed: true,
  },
];
export default todos;
