import { useContext } from "react";
import {
  TypeTestContext,
  TypeTestDispatchContext,
  ReducerState,
  ReducerAction,
} from "@/context/TypeTest";

export default function useTypeTestContext() {
  const context = useContext(TypeTestContext);
  const dispatch = useContext(TypeTestDispatchContext);

  return [context, dispatch] as [ReducerState, React.Dispatch<ReducerAction>];
}
