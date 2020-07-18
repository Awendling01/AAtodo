import React from "react";
import { AAState, TodoAction } from "./types";
export const ReducerContext = React.createContext<{
  state: AAState;
  dispatch: React.Dispatch<TodoAction>;
}>({
  state: { todos: { completed: [], incomplete: [] } },
  dispatch: () => {},
});
