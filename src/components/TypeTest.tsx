"use client";

import { useEffect, useState, useRef } from "react";
import Timer from "./Timer";
const words = [
  "hello",
  "world",
  "text",
  "test",
  "twitch",
  "youtube",
  "and",
  "but",
];

type Status = "idle" | "running" | "finished";

export default function TypeTest() {
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  // duration in seconds
  const [duration, setDuration] = useState(30);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  function generateWords() {
    const newWords = [];
    for (let i = 0; i < 8; i++) {
      newWords.push(`${words[Math.floor(Math.random() * words.length)]} `);
    }
    setGeneratedWords(newWords);
  }

  useEffect(() => {
    generateWords();
  }, []);

  function handleInputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (status === "idle") {
      setStatus("running");
    }

    setInputValue(e.target.value);
  }

  function restart() {
    setStatus("idle");
    setInputValue("");
    inputRef.current?.focus();
    generateWords();
  }

  function handleSpace(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === " " || e.code === "Space") {
      setInputValue("");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        id="test"
        className="h-24 bg-neutral-900 p-4 rounded-xl text-2xl font-bold"
      >
        {generatedWords.map((word, index) => (
          <span key={`{word}_${index}`}>{word}</span>
        ))}
      </div>
      <div className="flex flex-row gap-2">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputValueChange}
          onKeyDown={handleSpace}
          className="flex-1 bg-neutral-900 rounded-xl px-4"
        />
        <div id="wpm" className="bg-neutral-900 p-4 rounded-xl">
          0 WPM
        </div>
        <Timer status={status} duration={duration} />
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

      {generatedWords[currentWordIndex]}
    </div>
  );
}
