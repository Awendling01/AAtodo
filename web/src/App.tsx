import React from "react";
import "./App.css";
const startingDate = new Date();
type Todo = {
  name: string;
  completed: boolean;
  dueDate: Date;
};
const todos: Todo[] = [
  { name: "Clean Living Room", completed: false, dueDate: startingDate },
  { name: "Dog Duty", completed: true, dueDate: startingDate },
  { name: "Attend Meeting", completed: false, dueDate: startingDate },
  { name: "DEF", completed: false, dueDate: startingDate },
];

const todo = todos[0];
const App = () => {
  //body
  return (
    <div className="canvas">
      <div className="todoList">
        <div className="todo">
          <div className="name">{todo.name}</div>
          <div className="completed">
            {todo.completed ? "Complete" : "Incomplete"}
          </div>
          <div className="dueDate"></div>
        </div>
      </div>
    </div>
  );
};

// const App = () => {
//   // function body
//   const [theme, setTheme] = useState<"dark" | "light">("dark");
//   const changeTheme = () => {
//     theme === "dark" ? setTheme("light") : setTheme("dark");
//   };
//   return (
//     <div
//       className={`App fullscreen ${
//         theme === "dark" ? "darkgray" : "lightgray"
//       }`}
//     >
//       <h1 style={{ cursor: "pointer" }} onClick={changeTheme}>
//         Hello Andrew!
//       </h1>
//     </div>
//   );
// };
export default App;
