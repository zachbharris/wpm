import { createContext } from "react";

export type Status = "idle" | "running" | "finished";

export type ReducerState = {
  status: Status;
  duration: number;
  input: string;

  options: {
    includePunctuation: boolean;
    includeNumbers: boolean;
    showTimer: boolean;
    showWPM: boolean;
  };
};

export const initialState: ReducerState = {
  status: "idle",
  duration: 30,
  input: "",

  options: {
    includePunctuation: false,
    includeNumbers: false,
    showTimer: true,
    showWPM: true,
  },
};

export type ReducerAction = {
  type: string;
  payload?: Partial<ReducerState>;
};


export const TypeTestContext = createContext<ReducerState>(null!);
export const TypeTestDispatchContext = createContext<React.Dispatch<ReducerAction>>(null!);
