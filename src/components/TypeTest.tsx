"use client";

import { useCallback, useEffect, useRef, useReducer } from "react";
import {
  TypeTestContext,
  TypeTestDispatchContext,
  initialState,
} from "@/context/TypeTest";
import { reducer } from "@/reducers/TypeTest";
import Timer from "./Timer";
import Options from "./Options";
import WordsPerMinute from './wpm';
import Input from "./Input";
import RestartButton from './Restart'

export default function TypeTest() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEndOfLine = checkIfAtEndOfLine();

  function getCurrentWord() {
    return state.words?.[state.currentLine]?.[state.currentWord] ?? ""
  }

  function getCurrentLine() {
    return state.words[state.currentLine]
  }

  function checkIfAtEndOfLine() {
    const line = getCurrentLine();
    const word = getCurrentWord();

    return line?.[line?.length - 1] === word;
  }

  const handleCursor = useCallback(() => {
    const cursorEl = document.getElementById("cursor");
    const wordEl = document.getElementById(`word_${state.currentWord}`);
    const charEl = document.getElementById(`char_${state.currentWord}_${state.currentChar}`);

    if (cursorEl && wordEl && charEl) {
      cursorEl.style.left = `${wordEl.offsetLeft + charEl.offsetLeft}px`;
      cursorEl.style.width = `${charEl.offsetWidth}px`;
    }
  }, [state.words, state.currentWord, state.currentChar]);

  useEffect(() => {
    handleCursor();
  }, [state.status, handleCursor]);

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

                if (state.currentLine > lineIndex) return null;

                return (
                  <span id={lineId} key={lineId} className="flex flex-row">
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
          <div className="flex flex-row gap-2">
            <Input inputRef={inputRef} isEndOfLine={isEndOfLine} />
            <WordsPerMinute />
            <Timer />
            <RestartButton restart={restart} />
          </div>


          <Options />
        </div>
      </TypeTestDispatchContext.Provider>
    </TypeTestContext.Provider>
  );
}
