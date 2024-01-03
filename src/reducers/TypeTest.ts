import { ReducerState, ReducerAction } from '@/context/TypeTest';

export const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "running",
      };
    case "restart":
      return {
        ...state,
        status: "idle",
        input: "",
      };
    case "finish":
      return {
        ...state,
        status: "finished",
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
      }
    case "input_space":
      return {
        ...state,
        input: ""
      }
    default:
      return state;
  }
};

