import { useState, useEffect } from "react";
import useTypeTestContext from "@/hooks/useTypeTestContext";
import { calculateWordsPerMinute } from "@/lib/words";

export default function WPM() {
  const [state] = useTypeTestContext();
  const [wpm, setWpm] = useState(0);

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
          setWpm(wpm);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.status, state.currentDurationInSeconds]);

  return (
    <div className="bg-neutral-900 rounded-md p-4 flex flex-row gap-2 items-center justify-center w-full max-w-32">
      <span className="text-xl font-bold font-mono">{wpm}</span>
      <span className="text-sm">WPM</span>
    </div>
  );
}
