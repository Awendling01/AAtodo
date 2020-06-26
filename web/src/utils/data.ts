import { TodoType } from "./types";

const todos: TodoType[] = [
  { id: 0, name: "Get groceries", dueDate: new Date(), completed: false },
  { id: 1, name: "Wash dog", dueDate: new Date(), completed: false },
  { id: 2, name: "Clean house", dueDate: new Date(), completed: false },
  { id: 3, name: "Prospect gold", dueDate: new Date(), completed: true },
];

export const completedTodos: TodoType[] = [
  { id: 4, name: "Wash Car", dueDate: new Date(), completed: true },
  { id: 5, name: "Do Laundry", dueDate: new Date(), completed: true },
  { id: 6, name: "Clean Garage", dueDate: new Date(), completed: true },
  { id: 7, name: "Shovel Poop", dueDate: new Date(), completed: true },
];
export default todos;
