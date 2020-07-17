import { TodoType } from "./types";

const todos: TodoType[] = [
  {
    id: 7,
    sortOrder: 7,
    name: "Get groceries",
    dueDate: new Date(),
    completed: false,
    category: "Home",
  },
  {
    id: 6,
    sortOrder: 6,
    name: "Wash dog",
    dueDate: new Date(),
    completed: false,
    category: "Home",
  },
  {
    id: 5,
    sortOrder: 5,
    name: "Clean house",
    dueDate: new Date(),
    completed: false,
    category: "Home",
  },
  {
    id: 4,
    sortOrder: 4,
    name: "Prospect gold",
    dueDate: new Date(),
    completed: true,
    category: "Work",
  },
  {
    id: 3,
    sortOrder: 3,
    name: "Wash Car",
    dueDate: new Date(),
    completed: true,
    category: "Work",
  },
  {
    id: 2,
    sortOrder: 2,
    name: "Do Laundry",
    dueDate: new Date(),
    completed: true,
    category: "Work",
  },
  {
    id: 1,
    sortOrder: 1,
    name: "Clean Garage",
    dueDate: new Date(),
    completed: true,
    category: "School",
  },
  {
    id: 0,
    sortOrder: 0,
    name: "Shovel Poop",
    dueDate: new Date(),
    completed: true,
    category: "School",
  },
];
export default todos;
