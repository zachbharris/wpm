"use client";

import { ReducerState, ReducerAction } from "@/context/TypeTest";
import { generateWords } from "@/lib/words";

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
        ...state,
        words: generateWords(20),
        status: "idle",
        input: "",
        inputData: [],
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "generate_words":
      return {
        ...state,
        words: generateWords(20),
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
