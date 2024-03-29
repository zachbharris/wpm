import { createContext } from "react";

export type Status = "idle" | "running" | "finished";

export type Character = string
export type Word = Character[]
export type Line = Word[]
export type InputData = boolean[][][] 

export type ReducerState = {
  status: Status;
  input: string;

  // line>word
  words: string[][];

  // line>word>char
  inputData: boolean[][][];
  inputRef: React.RefObject<HTMLInputElement>

  currentLine: number;
  currentWord: number;
  currentChar: number;
  currentDurationInSeconds: number;

  options: {
    includePunctuation: boolean;
    includeNumbers: boolean;
    showTimer: boolean;
    showWPM: boolean;
    duration: number;
    cursor: "block" | "line";
  };
};

export const initialState: ReducerState = {
  status: "idle",
  input: "",
  words: [],
  inputData: [],
  inputRef: null!,

  currentLine: 0,
  currentWord: 0,
  currentChar: 0,
  currentDurationInSeconds: 0,

  options: {
    duration: 30,
    includePunctuation: false,
    includeNumbers: false,
    showTimer: true,
    showWPM: true,
    cursor: "block"
  },
};

export type ReducerAction = {
  type: string;
  payload?: Partial<ReducerState>;
};

export const TypeTestContext = createContext<ReducerState>(null!);
export const TypeTestDispatchContext = createContext<
  React.Dispatch<ReducerAction>
>(null!);
