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
  const [currentChar, setCurrentChar] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);

  const handleCursor = useCallback(() => {
    const cursor = document.getElementById("cursor");
    const word = document.getElementById(`word_${currentWord}`);
    const char = document.getElementById(`char_${currentWord}_${currentChar}`);

    if (cursor && word && char) {
      cursor.style.left = `${char.offsetLeft}px`;
      cursor.style.width = `${char.offsetWidth}px`;
    }
  }, [currentWord, currentChar]);

  useEffect(() => {
    handleCursor();
  }, [handleCursor]);

  useEffect(() => {
    if (state.status === "idle") {
      setCurrentChar(0);
      setCurrentWord(0);
      handleCursor();
    }
  }, [state.status, handleCursor]);

  function handleInputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (state.status === "idle") {
      dispatch({ type: "start" });
    }

    const chars = e.target.value.split("");
    const recentlyTypedChar = chars[chars.length - 1];

    if (recentlyTypedChar === " ") {
      setCurrentWord((prev) => prev + 1);
      setCurrentChar(0);
      dispatch({ type: "input", payload: { input: "" } });
    } else {
      setCurrentChar(e.target.value.length);
      dispatch({ type: "input", payload: { input: e.target.value } });
    }
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
            className="select-none h-24 bg-neutral-900 p-4 rounded-lg text-2xl font-bold"
          >
            <div>
              {state.words.map((word, index) => {
                const wordId = `word_${index}`;
                return (
                  <span
                    id={wordId}
                    key={wordId}
                    className="z-10 whitespace-pre-wrap"
                  >
                    {word.split("").map((char, charIndex) => {
                      const charId = `char_${index}_${charIndex}`;
                      return (
                        <span id={charId} key={charId}>
                          {char}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </div>

            <span
              id="cursor"
              className="absolute bg-neutral-700 h-8 rounded-sm"
              style={{
                top: 16,
                left: 16,
                zIndex: 0,
              }}
            />
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
