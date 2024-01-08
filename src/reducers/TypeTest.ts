"use client";

import { ReducerState, ReducerAction, initialState } from "@/context/TypeTest";
import { generateLinesOfWords } from "@/lib/words";

export const reducer = (
  state: ReducerState,
  action: ReducerAction,
): ReducerState => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "running",
      };
    case "restart":

      return {
        ...initialState,
        options: {
          ...state.options,
        },
        words: generateLinesOfWords(2),
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case 'tick':
      return {
        ...state,
        currentDurationInSeconds: state.currentDurationInSeconds + 1,
      }
    case "generate_words":
      return {
        ...state,
        status: "idle",
        words: generateLinesOfWords(2),
        inputData: [],
        input: "",
      };
    case "generate_line":
      return {
        ...state,
        words: [...state.words, ...generateLinesOfWords(1)],
      };
    case "update_state":
      return {
        ...state,
        ...action.payload,
      };
    case "input":
      return {
        ...state,
        input: action.payload?.input ?? "",
        inputData: action.payload?.inputData || state.inputData,
      };
    case "input_space":
      return {
        ...state,
        input: "",
      };
    default:
      return state;
  }
};
