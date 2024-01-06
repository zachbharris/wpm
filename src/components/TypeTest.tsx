"use client";

import { useCallback, useEffect, useRef, useReducer, useState } from "react";
import {
  TypeTestContext,
  TypeTestDispatchContext,
  initialState,
} from "@/context/TypeTest";
import { reducer } from "@/reducers/TypeTest";
import Timer from "./Timer";
import Options from "./Options";

export default function TypeTest() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);

  function getCurrentWord() {
    return document.getElementById(`word_${currentWord}`);
  }

  function getCurrentChar() {
    return document.getElementById(`char_${currentWord}_${currentChar}`);
  }

  function getCurrentLine() {
    return document.getElementById(`line_${currentLine}`);
  }

  function checkIfAtEndOfLine() {
    const line = getCurrentLine();
    const word = getCurrentWord();

    return line?.children[line?.children.length - 1] === word;
  }

  const handleCursor = useCallback(() => {
    const cursor = document.getElementById("cursor");
    const word = getCurrentWord();
    const char = getCurrentChar();

    if (cursor && word && char) {
      cursor.style.left = `${word.offsetLeft + char.offsetLeft}px`;
      cursor.style.width = `${char.offsetWidth}px`;
    }
  }, [state.words, currentWord, currentChar]);

  useEffect(() => {
    if (state.status === "idle") {
      setCurrentLine(0);
      setCurrentChar(0);
      setCurrentWord(0);
      handleCursor();
    } else {
      handleCursor();
    }
  }, [state.status, handleCursor]);

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
      const isEndOfLine = checkIfAtEndOfLine();

      if (isEndOfLine) {
        setCurrentLine((prev) => prev + 1);
        setCurrentWord(0);
        setCurrentChar(0);
        dispatch({ type: "generate_line" });
      } else {
        setCurrentWord((prev) => prev + 1);
        setCurrentChar(0);
      }

      dispatch({ type: "input", payload: { input: "" } });
    } else {
      const charIndex = e.target.value.length;
      const newInputValue = e.target.value;

      const inputData = [...state.inputData];

      if (!inputData[currentLine]) {
        inputData[currentLine] = [];
      }

      inputData[currentLine][currentWord] =
        handleCurrentWordInputData(newInputValue);

      dispatch({
        type: "input",
        payload: {
          input: newInputValue,
          inputData,
        },
      });
      setCurrentChar(charIndex);
    }
  }

  function compareInputToWord(input: string): boolean {
    const word = state.words[currentLine][currentWord];

    return word.startsWith(input);
  }

  function handleCurrentWordInputData(value: string) {
    const isCorrect = compareInputToWord(value);
    const charIndex = value.length - 1;

    let currentWordInputData =
      state.inputData?.[currentLine]?.[currentWord] || [];
    currentWordInputData[charIndex] = isCorrect;

    return currentWordInputData;
  }

  function restart() {
    dispatch({ type: "restart" });
    inputRef.current?.focus();
  }

  useEffect(() => {
    dispatch({ type: "generate_words" });
  }, []);

  return (
    <TypeTestContext.Provider value={state}>
      <TypeTestDispatchContext.Provider value={dispatch}>
        <div className="flex flex-col gap-2 relative">
          <div
            id="test"
            className="relative select-none h-24 bg-neutral-900 p-4 rounded-lg text-2xl font-bold"
          >
            <span
              id="cursor"
              className="absolute z-0 bg-neutral-700 h-8 rounded-sm"
            />

            <div>
              {state.words.map((line, lineIndex) => {
                const lineId = `line_${lineIndex}`;

                if (currentLine > lineIndex) return null;

                return (
                  <span id={lineId} key={lineId} className="flex flex-row">
                    {line.map((word, index) => {
                      const wordId = `word_${index}`;
                      let isWordComplete = false;
                      let isWordCorrect = false;
                      let isPastCurrentWord = false;

                      if (currentLine === lineIndex) {
                        if (currentWord > index) {
                          isPastCurrentWord = true;
                        }
                      }

                      if (isPastCurrentWord) {
                        const currentWordInputData =
                          state.inputData?.[lineIndex]?.[index] || [];
                        isWordComplete = true;

                        const isCharsCorrect = currentWordInputData.every(
                          (char) => char === true,
                        );
                        const isWordLengthCorrect =
                          currentWordInputData.length + 1 === word.length;

                        if (isCharsCorrect && isWordLengthCorrect) {
                          isWordCorrect = true;
                        }
                      }

                      return (
                        <span
                          id={wordId}
                          key={wordId}
                          className={`z-[1] relative whitespace-pre-wrap box-border 
                            ${
                              isWordComplete
                                ? isWordCorrect
                                  ? "text-green-500"
                                  : "text-red-500"
                                : undefined
                            }
                          `}
                        >
                          {word.split("").map((char, charIndex) => {
                            const charId = `char_${index}_${charIndex}`;
                            const isCharCorrect =
                              state.inputData[lineIndex]?.[index]?.[charIndex];

                            return (
                              <span
                                id={charId}
                                key={charId}
                                className={`${
                                  typeof isCharCorrect === "boolean" &&
                                  !isWordComplete
                                    ? isCharCorrect
                                      ? "text-green-500"
                                      : "text-red-500"
                                    : undefined
                                }`}
                              >
                                {char}
                              </span>
                            );
                          })}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <input
              ref={inputRef}
              value={state.input}
              onChange={handleInputValueChange}
              className="flex-1 bg-neutral-900 rounded-xl px-4 disabled:cursor-not-allowed disabled:text-neutral-700"
              disabled={state.status === "finished"}
            />
            <div id="wpm" className="bg-neutral-900 p-4 rounded-xl">
              0 WPM
            </div>
            <Timer />
            <button
              type="button"
              className="bg-neutral-900 hover:bg-neutral-800 rounded-xl p-4"
              onClick={restart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
              >
                <path
                  className="fill-neutral-100"
                  d="M368.9 142.9c-62.2-62.2-162.7-62.5-225.3-1L184.7 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.3c0 0 0 0 0 0H39.8c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.3 96.6c87.6-86.5 228.7-86.2 315.8 1c24.4 24.4 42.1 53.1 52.9 83.7c5.9 16.7-2.9 34.9-19.5 40.8s-34.9-2.9-40.8-19.5c-7.7-21.8-20.2-42.3-37.8-59.8zM495.8 312v7.6 .7V440c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-41.6-41.6c-87.6 86.5-228.7 86.2-315.8-1C73 390 55.3 361.3 44.5 330.6c-5.9-16.7 2.9-34.9 19.5-40.8s34.9 2.9 40.8 19.5c7.7 21.8 20.2 42.3 37.8 59.8c62.2 62.2 162.7 62.5 225.3 1L326.8 329c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8H463.4h.7 7.6c13.3 0 24 10.7 24 24z"
                />
              </svg>
            </button>
          </div>

          <Options />
        </div>
      </TypeTestDispatchContext.Provider>
    </TypeTestContext.Provider>
  );
}
