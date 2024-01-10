"use client";

import { useCallback, useEffect, useRef, useReducer } from "react";
import {
  TypeTestContext,
  TypeTestDispatchContext,
  initialState,
} from "@/context/TypeTest";
import useTypeTestContext from "@/hooks/useTypeTestContext";
import { reducer } from "@/reducers/TypeTest";
import Timer from "./Timer";
import Options from "./Options";
import WordsPerMinute from "./wpm";
import Input from "./Input";
import RestartButton from "./Restart";
import { cva } from "class-variance-authority";
import { debounce } from "lodash";

export default function TypeTest() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEndOfLine = checkIfAtEndOfLine();

  function getCurrentWord() {
    return state.words?.[state.currentLine]?.[state.currentWord] ?? "";
  }

  function getCurrentLine() {
    return state.words[state.currentLine];
  }

  function checkIfAtEndOfLine() {
    const line = getCurrentLine();
    const word = getCurrentWord();

    return line?.[line?.length - 1] === word;
  }

  useEffect(() => {
    dispatch({ type: "generate_words" });
  }, []);

  const handleResize = debounce(() => {
    const width = document.body.clientWidth;
    if (width < 900) {
      dispatch({ type: "restart" });
      inputRef.current?.focus();
    }
  }, 500);

  // handle screen resize
  useEffect(() => {
    inputRef.current?.focus();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <TypeTestContext.Provider value={{ ...state, inputRef }}>
      <TypeTestDispatchContext.Provider value={dispatch}>
        <div className="flex flex-col gap-4 relative">
          <div
            id="test"
            className="relative select-none h-24 bg-neutral-900 p-4 rounded-md text-2xl font-bold overflow-hidden"
          >
            <Cursor />
            <div>
              {state.words.map((line, lineIndex) => {
                const lineId = `line_${lineIndex}`;

                if (state.currentLine > lineIndex) return null;

                return (
                  <span
                    id={lineId}
                    key={lineId}
                    className="flex flex-row gap-1"
                  >
                    {line.map((word, index) => {
                      const wordId = `word_${index}`;
                      let isWordComplete = false;
                      let isWordCorrect = false;
                      let isPastCurrentWord = false;

                      if (state.currentLine === lineIndex) {
                        if (state.currentWord > index) {
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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Input
              inputRef={inputRef}
              isEndOfLine={isEndOfLine}
              className="w-full"
            />
            <div className="flex flex-row gap-4 flex-grow w-full">
              <WordsPerMinute />
              <Timer />
              <RestartButton />
            </div>
          </div>

          <Options />
        </div>
      </TypeTestDispatchContext.Provider>
    </TypeTestContext.Provider>
  );
}

const cursor = cva(["absolute", "z-0", "bg-neutral-700 h-8 rounded-sm"]);

function Cursor() {
  const [state] = useTypeTestContext();

  const handleCursor = useCallback(() => {
    const cursorEl = document.getElementById("cursor");
    const wordEl = document.getElementById(`word_${state.currentWord}`);
    const charEl = document.getElementById(
      `char_${state.currentWord}_${state.currentChar}`,
    );

    if (cursorEl && wordEl && charEl) {
      cursorEl.style.left = `${wordEl.offsetLeft + charEl.offsetLeft}px`;

      if (state.options.cursor === "block") {
        cursorEl.style.width = `${charEl.offsetWidth}px`;
      } else if (state.options.cursor === "line") {
        cursorEl.style.width = "2px";
      }
    } else {
    }
  }, [
    state.status,
    state.words,
    state.currentWord,
    state.currentChar,
    state.options.cursor,
  ]);

  useEffect(() => {
    handleCursor();
  }, [handleCursor]);

  return <span id="cursor" className={cursor()} />;
}

function Words() {}

function Word() {}

function Char() {}
