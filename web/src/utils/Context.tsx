import React from "react";
import { AAState, ReducerAction } from "./types";
export const ReducerContext = React.createContext<{
  state: AAState;
  dispatch: React.Dispatch<ReducerAction>;
}>({
  state: { todos: { completed: [], incomplete: [] } },
  dispatch: () => {},
});
