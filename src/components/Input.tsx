import { useState, useEffect } from "react";
import useTypeTestContext from "@/hooks/useTypeTestContext";
import { checkIfCurrentInputHasError } from "@/lib/words";

type InputProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  isEndOfLine: boolean;
};

export default function Input({ inputRef, isEndOfLine }: InputProps) {
  const [state, dispatch] = useTypeTestContext();
  const [hasError, setHasError] = useState(false);

  function compareInputToWord(input: string): boolean {
    const word = state.words[state.currentLine][state.currentWord];

    return word.startsWith(input);
  }

  function handleCurrentWordInputData(value: string) {
    const isCorrect = compareInputToWord(value);
    const charIndex = value.length - 1;

    let currentWordInputData =
      state.inputData?.[state.currentLine]?.[state.currentWord] || [];
    currentWordInputData[charIndex] = isCorrect;

    return currentWordInputData;
  }

  function handleInputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const chars = e.target.value.split("");
    const recentlyTypedChar = chars[chars.length - 1];

    if (state.input === "" && recentlyTypedChar === " ") {
      return;
    }

    if (state.status === "idle") {
      dispatch({ type: "start" });
    }

    if (recentlyTypedChar === " ") {
      // reset error state
      setHasError(false);

      if (isEndOfLine) {
        dispatch({
          type: "update_state",
          payload: {
            currentLine: state.currentLine + 1,
            currentWord: 0,
            currentChar: 0,
          },
        });
        dispatch({ type: "generate_line" });
      } else {
        dispatch({
          type: "update_state",
          payload: {
            currentWord: state.currentWord + 1,
            currentChar: 0,
          },
        });
      }

      dispatch({ type: "input", payload: { input: "" } });
    } else {
      const charIndex = e.target.value.length;
      const newInputValue = e.target.value;

      const inputData = [...state.inputData];

      if (!inputData[state.currentLine]) {
        inputData[state.currentLine] = [];
      }

      inputData[state.currentLine][state.currentWord] =
        handleCurrentWordInputData(newInputValue);

      const inputHasError = checkIfCurrentInputHasError(inputData);

      if (inputHasError) {
        setHasError(true);
      } else {
        setHasError(false);
      }

      dispatch({
        type: "input",
        payload: {
          input: newInputValue,
          inputData,
        },
      });

      dispatch({
        type: "update_state",
        payload: {
          currentChar: charIndex,
        },
      });
    }
  }

  return (
    <input
      ref={inputRef}
      onChange={handleInputValueChange}
      value={state.input}
      disabled={state.status === "finished"}
      readOnly={state.status === "finished"}
      className={`flex flex-1 text-xl font-bold transition-colors p-4 bg-neutral-900 rounded-md outline-none border border-neutral-800 ${
        hasError ? "focus:border-red-700" : "focus:border-blue-600"
      }`}
    />
  );
}
