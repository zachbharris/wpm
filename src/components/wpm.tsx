import { useState, useEffect } from "react";
import useTypeTestContext from "@/hooks/useTypeTestContext";
import { calculateWordsPerMinute } from "@/lib/words";
import { cn } from "@/lib/utils";

export default function WPM() {
  const [state, dispatch] = useTypeTestContext();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.status === "running") {
      interval = setInterval(() => {
        if (state.status !== "running") {
          clearInterval(interval);
        } else {
          const wpm = calculateWordsPerMinute(
            state.inputData,
            state.currentDurationInSeconds + 1,
          );
          dispatch({ type: "update_state", payload: { currentScore: wpm } });
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.status, state.currentDurationInSeconds]);

  return (
    <div
      className={cn(
        "flex flex-grow flex-row gap-2 items-center justify-center p-4",
        "bg-neutral-900 rounded-md",
      )}
    >
      <span className="text-xl font-bold font-mono">{state.currentScore}</span>
      <span className="text-sm">WPM</span>
    </div>
  );
}
